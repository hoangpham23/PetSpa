package com.team.controller;

import com.team.dto.MailBody;
import com.team.model.Accounts;
import com.team.model.Customers;
import com.team.repository.AccountRepository;
import com.team.repository.CustomerRepository;
import com.team.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/forgotpassword")
public class ForgotPasswordController {

    private final CustomerRepository customerRepository;
    private final EmailService emailService;
    private final AccountRepository accountRepository;

    public ForgotPasswordController(CustomerRepository customerRepository, EmailService emailService, AccountRepository accountRepository) {
        this.customerRepository = customerRepository;
        this.emailService = emailService;
        this.accountRepository = accountRepository;
    }

    @PostMapping("")
    public ResponseEntity<String> verifyMail(@RequestBody Map<String, String> customerEmail) {
        String email = customerEmail.get("email");
        Customers customers = customerRepository.findByEmail(email);
        if (customers == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This account does not exist");
        }

        Accounts accounts = accountRepository.findById(customers.getCustomerID()).get();
        if (accounts == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This account does not exist");
        }
        // create otp from otp generator
        int otp = otpGenerator();
        accounts.setOtp(String.valueOf(otp)); // Ensure OTP is stored as a String
        accountRepository.save(accounts);

        // compose email information
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("This is the OTP for your Forgot Password request: " + otp)
                .subject("OTP for Forgot Password request")
                .build();

        // send mail
        emailService.sendSimpleMessage(mailBody);
        return ResponseEntity.status(HttpStatus.OK).body("OTP has been sent to your email");
    }

    @PutMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> customerVerify) {
        String email = customerVerify.get("email");
        String password = customerVerify.get("password");
        int otp = Integer.parseInt(customerVerify.get("otp"));

        Customers customers = customerRepository.findByEmail(email);
        if (customers == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This account does not exist");
        }

        Accounts accounts = accountRepository.findById(customers.getCustomerID()).get();
        if (accounts == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This account does not exist");
        }
        if (!accounts.getOtp().equals(String.valueOf(otp))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
        }
        accounts.setPassword(password);
        accounts.setOtp(null); // Clear OTP after successful verification
        accountRepository.save(accounts);
        return ResponseEntity.status(HttpStatus.OK).body("Password has been reset successfully");
    }

    private int otpGenerator() {
        Random random = new Random();
        return random.nextInt(900000) + 100000; // Generate 6-digit OTP
    }
}




