package com.team.controller;


import com.team.model.Customers;
import com.team.service.AccountService;
import com.team.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> signUp(
            @RequestParam String customerName,
            @RequestParam String password,
            @RequestParam String phoneNumber,
            @RequestParam String email)
    {
        if (accountService.checkEmail(email)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
        }
        accountService.createAccount(email, password);
        int customerId = accountService.findAccountID(email, password).getAccountID();

        Customers customers = customerService.createCustomer(customerId, customerName, phoneNumber, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(customers);
    }

}
