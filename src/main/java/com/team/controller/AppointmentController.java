package com.team.controller;


import com.team.dto.AppointmentDTO;
import com.team.dto.RescheduleDTO;
import com.team.service.AppointmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/appointment/")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }


    // return appointments are booked
    @GetMapping("time")
    public ResponseEntity<?> getAppointmentTime() {
        try {
            LocalDateTime requestTime = LocalDateTime.now();
            List<AppointmentDTO> listAppointments = appointmentService.getAllAppointments(requestTime);
            if (listAppointments.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.ok(listAppointments);
        }catch (Exception e){
            log.error(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at server site");
    }

    @PostMapping("reschedule")
    public ResponseEntity<?> rescheduleAppointment(@RequestBody RescheduleDTO request) {
        try {
            appointmentService.rescheduleAppointment(request);
            return ResponseEntity.ok("Rescheduled successful");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at server site");
        }
    }

}
