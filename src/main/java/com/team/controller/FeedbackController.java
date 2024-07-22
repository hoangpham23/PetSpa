package com.team.controller;

import com.team.dto.CustomerFeedbackDTO;
import com.team.dto.FeedbackRequestDTO;
import com.team.model.Customers;
import com.team.model.Feedback;
import com.team.service.CustomerService;
import com.team.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;
    private final CustomerService customerService;

    public FeedbackController(FeedbackService feedbackService, CustomerService customerService) {
        this.feedbackService = feedbackService;
        this.customerService = customerService;
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkFeedback(@RequestParam(value = "customerID", required = false)Integer customerID) {
        if (customerID == null) {
            return ResponseEntity.ok(false);
        }
        Customers customer = customerService.getCustomerById(customerID);
        Optional<Feedback> feedback = feedbackService.getFeedbackByCustomerAndStatus(customer, "Have not feedback");
        return ResponseEntity.ok(feedback.isPresent());
    }
    @GetMapping("/choose-feedback")
    public ResponseEntity<List<CustomerFeedbackDTO>> getCustomerFeedbacks(@RequestParam (value = "customerID", required = false) Integer customerID) {
        if (customerID == null) {
            return ResponseEntity.ok().body(Collections.emptyList());
        }
        Customers customer = customerService.getCustomerById(customerID);
        List<CustomerFeedbackDTO> feedbacks = feedbackService.getFeedbacksByCustomerAndStatus(customer, "Have not feedback");
        return ResponseEntity.ok(feedbacks);
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackRequestDTO feedbackRequest) {
        Optional<Feedback> existingFeedbackOpt = feedbackService.getFeedbackByID(feedbackRequest.getFeedbackID());
        if (existingFeedbackOpt.isPresent()) {
            Feedback existingFeedback = existingFeedbackOpt.get();
            existingFeedback.setFeedbackContent(feedbackRequest.getFeedbackContent());
            feedbackService.updateFeedbackStatus(existingFeedback, "Had feedback");
            return ResponseEntity.ok("Feedback submitted successfully");
        }
        return ResponseEntity.badRequest().body("No feedback record found to update");
    }

    @PostMapping("/close")
    public ResponseEntity<String> closeFeedbackForm(@RequestBody FeedbackRequestDTO feedbackRequest) {
        Customers customer = customerService.getCustomerById(feedbackRequest.getCustomerID());
        List<CustomerFeedbackDTO> feedbacks = feedbackService.getFeedbacksByCustomerAndStatus(customer, "Have not feedback");
        if (!feedbacks.isEmpty()) {
            for (CustomerFeedbackDTO feedbackDTO : feedbacks) {
                Optional<Feedback> feedback = feedbackService.getFeedbackByID(feedbackDTO.getFeedbackID());
                if (feedback.isPresent()) {
                    feedbackService.updateFeedbackStatus(feedback.get(), "Don't feedback");
                }
            }
            return ResponseEntity.ok("All feedbacks have been closed");
        } else {
            return ResponseEntity.badRequest().body("No feedback records found to update");
        }
    }
}
