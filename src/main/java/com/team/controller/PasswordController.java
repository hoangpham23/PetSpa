package com.team.controller;

import com.team.model.Customers;
import com.team.service.CustomerService;
//import com.team.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forget")
public class PasswordController {

    private CustomerService customerService;

    public PasswordController(CustomerService customerService){
        this.customerService = customerService;
    }

    @PostMapping("")
    public ResponseEntity<?> validCheck(@RequestParam String email){
        Customers customers = customerService.checkMail(email);
        System.out.println(customers);
        if(customers == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found");
        }
//            int mail = customers.getNumberOfPets();
//            customers.getEmail();
            return ResponseEntity.status(HttpStatus.OK).body(customers);
    }

    @PutMapping("")
    public ResponseEntity<?> update(@RequestParam String email, @RequestParam int numberOfPets){
        Customers customers = customerService.checkMail(email);
        if (customers == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        }
        customers.setNumberOfPets(numberOfPets);
        customerService.update(customers);
        return ResponseEntity.status(HttpStatus.OK).body(customers);
    }

//    @GetMapping
//    public String changePasswordForm() {
//        return "change-password";
//    }
//
//    @PostMapping("/request-otp")
//    public String requestOtp(@RequestParam String username) {
//        userService.generateAndSendOtp(username);
//        return "otp-sent";
//    }
//
//    @PostMapping("/verify-otp")
//    public String verifyOtp(@RequestParam String username, @RequestParam String otp, @RequestParam String newPassword) {
//        if (userService.verifyOtp(username, otp)) {
//            userService.changePassword(username, newPassword);
//            return "password-changed";
//        } else {
//            return "invalid-otp";
//        }
//    }


}

