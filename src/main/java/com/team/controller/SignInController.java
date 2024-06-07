package com.team.controller;

import com.team.dto.AccountDTO;
import com.team.service.AccountService;
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

    public SignInController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> login(@RequestBody Map<String, String> accountData) {
        try {
            String email = accountData.get("email");
            String password = accountData.get("password");

            // using jpa to prevent SQL injection
            AccountDTO accounts = accountService.checkLogin(email, password);

            // using jdbc to test SQL map and see how SQL injection work
//            Accounts accounts = accountService.checkAccountV4(email, password);

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
