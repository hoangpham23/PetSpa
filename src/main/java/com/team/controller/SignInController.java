package com.team.controller;

import com.team.dto.AccountDTO;
import com.team.dto.CustomerDTO;
import com.team.service.AccountService;
import com.team.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;


@RestController
@RequestMapping("")
public class SignInController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final AccountService accountService;
    private final CustomerService customerService;

    public SignInController(AccountService accountService, CustomerService customerService) {
        this.accountService = accountService;
        this.customerService = customerService;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> login(@RequestBody Map<String, String> accountData) {
        try {
            String email = accountData.get("email");
            String password = accountData.get("password");

            // using jpa to prevent SQL injection
            AccountDTO accounts = accountService.checkLogin(email, password);
            if (accounts == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }
            CustomerDTO customerDTO = customerService.getCustomerByAccountID(accounts.getAccountID(), accounts.getRole());
            return ResponseEntity.ok().body(customerDTO);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at server site");
        }

    }

}
