package com.team.controller;

import com.team.dto.CustomerFeedbackForEmployeeDTO;
import com.team.service.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/customer-feedback-for-employee")
public class CustomerFeedbackForEmployeeController {
    private final FeedbackService feedbackService;

    public CustomerFeedbackForEmployeeController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping()
    public ResponseEntity<?> getFeedbackForEmployee(@RequestParam("appointmentID") Integer appointmentID) {
        try {
            List<CustomerFeedbackForEmployeeDTO> feedbackList = feedbackService.getFeedbackForEmployeeByAppointment(appointmentID);
            if (feedbackList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("There is no Feedback");
            } else {
                return ResponseEntity.ok(feedbackList);
            }
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }
    }

}
