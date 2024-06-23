package com.team.controller;

import com.team.dto.WorkDateDTO;
import com.team.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/employee/")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("schedule")
    public ResponseEntity<?> getEmployeeSchedule(
            @RequestParam int employeeID,
            @RequestParam(required = false) LocalDate date

    ) {
        try {
            List<WorkDateDTO> schedule = employeeService.getSchedule(employeeID, date);
            if (schedule == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There aren't any shifts");
            }
            return ResponseEntity.ok(schedule);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
