package com.team.controller;

import com.team.dto.EditAccountDTO;
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

    public EditAcountController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PutMapping
    public ResponseEntity<?> editAccount(@RequestBody Map<String, String> data) {

        Integer customerID = Integer.parseInt(data.get("customerID"));
        String email = data.get("email");
        String customerName = data.get("customerName");
        String phoneNumber = data.get("phoneNumber");

        try {
            EditAccountDTO newInfor = customerService.editCustomer(customerID, customerName, email, phoneNumber);
            return ResponseEntity.status(HttpStatus.OK).body(newInfor);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}

