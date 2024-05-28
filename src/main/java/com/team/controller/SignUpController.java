package com.team.controller;


import com.team.model.Customers;
import com.team.service.AccountService;
import com.team.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/sign-up")
public class SignUpController {

    private CustomerService customerService;
    private AccountService accountService;

    public SignUpController(CustomerService customerService, AccountService accountService) {
        this.customerService = customerService;
        this.accountService = accountService;
    }


    @PostMapping("")
    public ResponseEntity<?> signUp(@RequestBody Map<String, String> data) {

        System.out.println("data " + data);
        String customerName = data.get("customerName");
        String password = data.get("password");
        String email = data.get("email");
        String phoneNumber = data.get("phone");

        if (accountService.checkEmail(email)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
        }
        accountService.createAccount(email, password);
        int customerId = accountService.findAccountID(email, password).getAccountID();

        Customers customers = customerService.createCustomer(customerId, customerName, phoneNumber, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(customers);
    }

}
