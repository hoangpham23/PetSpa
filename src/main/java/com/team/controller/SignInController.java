package com.team.controller;

import com.team.model.Accounts;
import com.team.service.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("")
public class SignInController {

    private AccountService accountService;

    public SignInController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> login(@RequestBody Map<String, String> accountData, HttpServletRequest request) {
        String email = accountData.get("email");
        String password = accountData.get("password");
        Accounts accounts = accountService.checkLogin(email, password);
        if (accounts != null) {
            return ResponseEntity.ok().body(accounts);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

}