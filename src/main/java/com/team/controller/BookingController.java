package com.team.controller;


import com.team.dto.AppointmentDTO;
import com.team.service.AppointmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/book")
public class BookingController {

    private final Logger logger = LoggerFactory.getLogger(BookingController.class);
    private final AppointmentService appointmentService;

    public BookingController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllBookings() {
        try {
            List<AppointmentDTO> appointments = appointmentService.getAllAppointments();
            return ResponseEntity.ok(appointments);
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at server site");
    }


}
