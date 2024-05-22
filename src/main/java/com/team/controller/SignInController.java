package com.team.controller;

import com.team.model.Account;
import com.team.service.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/sign-in")
public class SignInController {

    private AccountService accountService;
    ;

    public SignInController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password, HttpServletRequest request) {
        Account account = accountService.checkLogin(email, password);
        if (account != null) {
            return ResponseEntity.ok().body(account);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

}
