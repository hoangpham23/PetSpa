package com.team.controller;

import com.team.model.Accounts;
import com.team.model.Customers;
import com.team.repository.AccountRepository;
import com.team.repository.CustomerRepository;
import com.team.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Map;

@RestController
@RequestMapping("/forgotpassword")
public class ForgotPasswordController {

    private final Logger logger = LoggerFactory.getLogger(ForgotPasswordController.class);

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
        try {
            String email = customerEmail.get("email");
            Accounts findAccounts = accountRepository.findByEmail(email);
            if (findAccounts == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This account does not exist");
            }

            Accounts accounts = accountRepository.findById(findAccounts.getAccountID()).get();

            // create otp from otp generator
            int otp = otpGenerator();
            accounts.setOtp(String.valueOf(otp)); // Ensure OTP is stored as a String
            accountRepository.save(accounts);

            emailService.sendOtpEmail(email, String.valueOf(otp), "Pawfection");

            return ResponseEntity.status(HttpStatus.OK).body("OTP has been sent to your email");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PutMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> customerVerify) {
        try {
            String email = customerVerify.get("email");
            String password = customerVerify.get("password");
            int otp = Integer.parseInt(customerVerify.get("otp"));

            Accounts findAccounts = accountRepository.findByEmail(email);
            if (findAccounts == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This account does not exist");
            }

            Accounts accounts = accountRepository.findById(findAccounts.getAccountID()).get();

            if (!accounts.getOtp().equals(String.valueOf(otp))) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
            }

            accounts.setPassword(password);
            accounts.setOtp(null); // Clear OTP after successful verification
            accountRepository.save(accounts);
            return ResponseEntity.status(HttpStatus.OK).body("Password has been reset successfully");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    private final SecureRandom secureRandom = new SecureRandom();

    private int otpGenerator() {
        return secureRandom.nextInt(900000) + 100000; // Generate 6-digit OTP
    }
}
