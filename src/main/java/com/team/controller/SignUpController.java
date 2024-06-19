package com.team.controller;


import com.team.dto.CustomerDTO;
import com.team.service.AccountService;
import com.team.service.CustomerService;
import com.team.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@RestController
@RequestMapping("/sign-up")
public class SignUpController {

    private final Logger logger = LoggerFactory.getLogger(SignUpController.class);
    private final CustomerService customerService;
    private final AccountService accountService;
    private final EmailService emailService;
    private final Map<String, Object> tempData = new HashMap<>();

    public SignUpController(EmailService emailService, CustomerService customerService, AccountService accountService) {
        this.customerService = customerService;
        this.accountService = accountService;
        this.emailService = emailService;
    }


    @PostMapping("")
    public ResponseEntity<?> signUp(@RequestBody Map<String, String> data) {
        try {
            String email = data.get("email");
            int otp = otpGenerator();
            if (accountService.checkEmail(email)){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
            }

            // send email to verity that email valid
            String text = "This is the OTP for verification: " + otp;
            String subject = "Verify OTP";
            emailService.sendEmail(email, text, subject);

            // store the information when customer sign up
            tempData.putAll(data);
            tempData.put("sendOtp", otp);
            return ResponseEntity.ok("send verity otp");
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at server site");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> data) {
        try {
            int otp = Integer.parseInt(data.get("otp"));
            if (!tempData.get("sendOtp").equals(otp)){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
            }
            // create a customer
            String email = (String) tempData.get("email");
            String customerName = (String) tempData.get("customerName");
            String phoneNumber = (String) tempData.get("phoneNumber");
            String password = (String) tempData.get("password");

            CustomerDTO customers = customerService.createCustomer(customerName, phoneNumber, email, password);
            return ResponseEntity.status(HttpStatus.CREATED).body(customers);
        }catch (Exception e){
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error at server site");
        }
    }
    private int otpGenerator() {
        Random random = new Random();
        return random.nextInt(900000) + 100000; // Generate 6-digit OTP
    }

}
