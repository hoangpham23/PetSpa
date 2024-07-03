package com.team.controller;

import com.team.dto.ManageAppointmentDTO;
import com.team.model.Appointments;
import com.team.service.AppointmentService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/manage-appointment")
public class ManageAppointmentController {

    private final AppointmentService appointmentService;

    public ManageAppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<ManageAppointmentDTO> getAppointmentsForDate(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return appointmentService.getAppointmentsForDate(date);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ManageAppointmentDTO>> getAppointmentsByPhoneNumberAndDate(@RequestParam String phoneNumber, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<ManageAppointmentDTO> appointments = appointmentService.getAppointmentsByPhoneNumberAndDate(phoneNumber, date);
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("")
    public ResponseEntity<String> updateAppointmentStatus(@RequestBody Appointments request) {
        boolean isUpdated = appointmentService.updateAppointmentStatus(request.getAppointmentID(), request.getStatus());
        if (isUpdated) {
            return ResponseEntity.ok("Status has been updated to " + request.getStatus());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found.");
        }
    }
}
