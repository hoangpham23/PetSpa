package com.team.controller;

import com.team.dto.AccountDTO;
import com.team.dto.CustomerDTO;
import com.team.dto.EmployeeResponseDTO;
import com.team.dto.IntrospectRequest;
import com.team.service.AccountService;
import com.team.service.CustomerService;
import com.team.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/sign-in")
public class SignInController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final AccountService accountService;
    private final CustomerService customerService;
    private final EmployeeService employeeService;

    public SignInController(AccountService accountService, CustomerService customerService, EmployeeService employeeService) {
        this.accountService = accountService;
        this.customerService = customerService;
        this.employeeService = employeeService;
    }

    @PostMapping("")
    public ResponseEntity<?> login(@RequestBody Map<String, String> accountData) {
        try {
            String email = accountData.get("email");
            String password = accountData.get("password");

            // using jpa to prevent SQL injection
            AccountDTO accounts = accountService.checkLogin(email, password);
            if (accounts == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }
            if ("CUS".equals(accounts.getRole())) {
                CustomerDTO customerDTO = customerService.getCustomerByAccountID(accounts.getAccountID(), accounts.getRole(), accounts.getToken());
                return ResponseEntity.ok().body(customerDTO);
            }

            if ("EM".equals(accounts.getRole())) {
                EmployeeResponseDTO employeeResponseDTO = employeeService.getEmployee(accounts);
                if (employeeResponseDTO != null){
                    employeeResponseDTO.setRole("EM");
                    return ResponseEntity.ok().body(employeeResponseDTO);
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }

            if ("AD".equals(accounts.getRole())) {
                return ResponseEntity.ok().body(accounts);
            }

        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at server site");

    }

    // check the token
    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody IntrospectRequest request) {
        try {
            boolean check = accountService.introspect(request);
            if (!check) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
            return ResponseEntity.ok().body("Valid token");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
