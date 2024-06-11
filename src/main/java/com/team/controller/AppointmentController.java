package com.team.controller;


import com.team.dto.AppointmentDTO;
import com.team.dto.AppointmentRequestDTO;
import com.team.model.Appointments;
import com.team.dto.ServiceDTO;
import com.team.service.AppointmentService;
import com.team.service.FunctionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/appointment/")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final FunctionService functionService;

    public AppointmentController(AppointmentService appointmentService, FunctionService functionService) {
        this.appointmentService = appointmentService;
        this.functionService = functionService;
    }

    @GetMapping("service")
    public ResponseEntity<?> getService() {
        try {
            List<ServiceDTO> listService = functionService.getServices();
            if (listService.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.ok(listService);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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


    @PostMapping("book")
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentRequestDTO appointmentRequest) {
        try {
            appointmentService.createAppointment(appointmentRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Create an appointment successfully");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
