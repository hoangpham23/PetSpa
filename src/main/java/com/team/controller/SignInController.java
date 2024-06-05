package com.team.controller;

import com.team.dto.AccountDTO;
import com.team.model.Accounts;
import com.team.service.AccountService;
import jakarta.servlet.http.HttpServletRequest;
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
    private AccountService accountService;

    public SignInController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> login(@RequestBody Map<String, String> accountData, HttpServletRequest request) {
        try {
            String email = accountData.get("email");
            String password = accountData.get("password");
            // log the information out in terminal
            AccountDTO accounts = accountService.checkLogin(email, password); // using jpa
//            Accounts accounts = accountService.checkAccountV4(email, password); // using jdbc write sql

            if (accounts != null) {
                return ResponseEntity.ok().body(accounts);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at server site");
        }

    }

}
