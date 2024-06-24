package com.team.controller;

import com.team.model.Customers;
import com.team.model.Feedback;
import com.team.service.CustomerService;
import com.team.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;
    private final CustomerService customerService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService, CustomerService customerService) {
        this.feedbackService = feedbackService;
        this.customerService = customerService;
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkFeedback() {
        Customers customer = customerService.getLoggedInCustomer();
        Optional<Feedback> feedback = feedbackService.getFeedbackByCustomerAndStatus(customer, "Not feedback");
        return ResponseEntity.ok(feedback.isPresent());
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody Feedback feedback) {
        Customers customer = customerService.getLoggedInCustomer();
        Optional<Feedback> existingFeedbackOpt = feedbackService.getFeedbackByCustomerAndStatus(customer, "Not feedback");
        if (existingFeedbackOpt.isPresent()) {
            Feedback existingFeedback = existingFeedbackOpt.get();
            existingFeedback.setFeedbackContent(feedback.getFeedbackContent());
            feedbackService.updateFeedbackStatus(existingFeedback, "Had feedback");
            return ResponseEntity.ok("Feedback submitted successfully");
        }
        return ResponseEntity.badRequest().body("No feedback record found to update");
    }

    @PostMapping("/decline")
    public ResponseEntity<String> declineFeedback() {
        Customers customer = customerService.getLoggedInCustomer();
        Optional<Feedback> existingFeedbackOpt = feedbackService.getFeedbackByCustomerAndStatus(customer, "Not feedback");
        if (existingFeedbackOpt.isPresent()) {
            Feedback existingFeedback = existingFeedbackOpt.get();
            feedbackService.updateFeedbackStatus(existingFeedback, "Don't want to feedback");
            return ResponseEntity.ok("Feedback declined successfully");
        }
        return ResponseEntity.badRequest().body("No feedback record found to update");
    }
}
