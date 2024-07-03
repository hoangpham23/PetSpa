package com.team.controller;

import com.team.dto.CustomerFeedbackDTO;
import com.team.dto.FeedbackRequestDTO;
import com.team.model.Customers;
import com.team.model.Feedback;
import com.team.service.CustomerService;
import com.team.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Boolean> checkFeedback(@RequestParam Integer customerID) {
        Customers customer = customerService.getCustomerById(customerID);
        Optional<Feedback> feedback = feedbackService.getFeedbackByCustomerAndStatus(customer, "Have not feedback");
        return ResponseEntity.ok(feedback.isPresent());
    }
    @GetMapping("/choose-feedback")
    public ResponseEntity<List<CustomerFeedbackDTO>> getCustomerFeedbacks(@RequestParam Integer customerID) {
        Customers customer = customerService.getCustomerById(customerID);
        List<CustomerFeedbackDTO> feedbacks = feedbackService.getFeedbacksByCustomerAndStatus(customer, "Have not feedback");
        return ResponseEntity.ok(feedbacks);
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackRequestDTO feedbackRequest) {
        Customers customer = customerService.getCustomerById(feedbackRequest.getCustomerID());
        Optional<Feedback> existingFeedbackOpt = feedbackService.getFeedbackByCustomerAndStatus(customer, "Have not feedback");
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
        Optional<Feedback> existingFeedbackOpt = feedbackService.getFeedbackByCustomerAndStatus(customer, "Have not feedback");
        if (existingFeedbackOpt.isPresent()) {
            Feedback existingFeedback = existingFeedbackOpt.get();
            feedbackService.updateFeedbackStatus(existingFeedback, "Don't feedback");
            return ResponseEntity.ok("Feedback form closed successfully");
        }
        return ResponseEntity.badRequest().body("No feedback record found to update");
    }
}
