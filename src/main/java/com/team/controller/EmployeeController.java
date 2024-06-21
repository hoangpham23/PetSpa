package com.team.controller;

import com.team.dto.WorkDateDTO;
import com.team.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/employee/")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("schedule")
    public ResponseEntity<?> getEmployeeSchedule(@RequestBody Map<String, String> request) {
        try {
            int employeeID = Integer.parseInt(request.get("employeeID"));
            LocalDate time = LocalDate.parse(request.get("date"));
            List<WorkDateDTO> schedule = employeeService.getSchedule(employeeID, time);
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
