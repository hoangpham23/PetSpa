package com.team.controller;

import com.team.dto.EditAccountDTO;
import com.team.service.AccountService;
import com.team.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/edit-account")
public class EditAcountController {
    private final CustomerService customerService;
    private final AccountService accountService;

    public EditAcountController(CustomerService customerService, AccountService accountService) {
        this.customerService = customerService;
        this.accountService = accountService;
    }

    @PutMapping
    public ResponseEntity<?> editAccount(@RequestBody Map<String, String> data) {

        Integer customerID = Integer.parseInt(data.get("customerID"));
        String email = data.get("email");
        String customerName = data.get("customerName");
        String phoneNumber = data.get("phoneNumber");
        if (accountService.checkEmail(email)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
        }
        if (customerService.checkPhoneNumber(phoneNumber)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Phone number is already in use");
        }
        EditAccountDTO newInfor = customerService.editCustomer(customerID, customerName, email, phoneNumber);

        return ResponseEntity.status(HttpStatus.OK).body(newInfor);
    }
}
