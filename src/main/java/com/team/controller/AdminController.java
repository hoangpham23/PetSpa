package com.team.controller;

import com.team.dto.EmployeeDTO;
import com.team.model.Employees;
import com.team.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final EmployeeService employeeService;

    public AdminController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public ResponseEntity<?> showAllEmployees() {
        try {
            var authentication = SecurityContextHolder.getContext().getAuthentication();

            log.info("Email: {}", authentication.getName());
            authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
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

            Map<String, String> msg = employeeService.createEmployee(data);
            if (msg == null){
                return ResponseEntity.status(HttpStatus.CREATED).body("Created successfully!");
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body(msg);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateEmployee(@RequestBody EmployeeDTO employeeDTO){
        try {
            Map<String, String> errors = employeeService.updateEmployee(employeeDTO);
            if (!errors.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(errors);
            }

            return ResponseEntity.ok().body("Employee updated successfully");
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
