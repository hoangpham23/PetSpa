package com.team.controller;

import com.team.dto.EmployeeDTO;
import com.team.model.Employees;
import com.team.service.AccountService;
import com.team.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/admin")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final AccountService accountService;

    public EmployeeController(EmployeeService employeeService, AccountService accountService) {
        this.employeeService = employeeService;
        this.accountService = accountService;
    }

    @GetMapping("/employees")
    public ResponseEntity<?> showAllEmployees() {
        try {
            List<EmployeeDTO> employeeDTOList = employeeService.showAllEmployees();
            if (employeeDTOList.isEmpty()){
                return ResponseEntity.ok("There aren't any employees.");
            }

            return ResponseEntity.ok(employeeDTOList);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Integer employeeID ){
        try {
            Employees employees =  employeeService.deleteEmployee(employeeID);
            if (employees == null){
                return  ResponseEntity.badRequest().body("Invalid employeeID");
            }
            return ResponseEntity.ok("Delete Successfully!");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create-employee")
    public ResponseEntity<?> createEmployee(@RequestBody Map<String, String> data){
        try {
            String email = data.get("email");
            if (accountService.checkEmail(email)){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists!");
            }

            Employees employees = employeeService.createEmployee(data);
            if (employees == null){
                return ResponseEntity.badRequest().body("Failed to create an employee");
            }
            return ResponseEntity.ok("Created successfully!");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
