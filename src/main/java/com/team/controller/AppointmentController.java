package com.team.controller;


import com.team.dto.AppointmentDTO;
import com.team.service.AppointmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.*;
import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    private final Logger logger = LoggerFactory.getLogger(AppointmentController.class);
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllBookings() {
        try {
            LocalDateTime time = LocalDateTime.now().plusDays(1);
            List<AppointmentDTO> appointments = appointmentService.getAllAppointments(time);
            return ResponseEntity.ok(appointments);
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at server site");
    }


}