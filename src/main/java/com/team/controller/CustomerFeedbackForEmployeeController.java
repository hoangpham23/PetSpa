package com.team.controller;

import com.team.dto.CustomerFeedbackForEmployeeDTO;
import com.team.service.FeedbackService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/customer-feedback-for-employee")
public class CustomerFeedbackForEmployeeController {
    private final FeedbackService feedbackService;

    public CustomerFeedbackForEmployeeController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping()
    public List<CustomerFeedbackForEmployeeDTO> getFeedbackForEmployee(@RequestParam("appointmentID") Integer appointmentID) {
        return feedbackService.getFeedbackForEmployeeByAppointment(appointmentID);
    }
}
