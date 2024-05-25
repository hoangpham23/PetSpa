package com.team.controller;

import com.team.dto.MailBody;
import com.team.model.Accounts;
import com.team.model.Customers;

import com.team.repository.AccountRepository;
import com.team.repository.CustomerRepository;
import com.team.service.EmailService;

import jakarta.servlet.http.HttpSession;
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

    private final HttpSession httpSession;

    private final AccountRepository accountRepository;


    public ForgotPasswordController(CustomerRepository customerRepository, EmailService emailService, HttpSession httpSession, AccountRepository accountRepository){//, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.emailService = emailService;
        this.httpSession = httpSession;
        this.accountRepository = accountRepository;
    }

    @PostMapping("")
    public ResponseEntity<String> verifyMail(@RequestBody Map<String,String> customerEmail) {
        String email = customerEmail.get("email");
        Customers customers = customerRepository.findByEmail(email);
        if (customers == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This account does not exist");
        }
        int otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("This is the OTP for your Forgot Password request: " + otp)
                .subject("OTP for Forgot Password request")
                .build();

        emailService.sendSimpleMessage(mailBody);
        httpSession.setAttribute(email, otp);
        return ResponseEntity.status(HttpStatus.OK).body("OTP has sent to your email");
    }


    @PutMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String,String> customerVerify) {
        String email = customerVerify.get("email");
        String password = customerVerify.get("password");
        Integer otp = Integer.parseInt(customerVerify.get("otp"));

        Integer storedOtp = (Integer) httpSession.getAttribute(email);
        if (storedOtp == null || !storedOtp.equals(otp)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
        }
        Customers customers = customerRepository.findByEmail(email);
        if (customers == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This account does not exist");
        }
        Accounts accounts = accountRepository.findById(customers.getCustomerID());
        accounts.setPassword(password);
        accountRepository.save(accounts);
        httpSession.removeAttribute(email);
        return ResponseEntity.status(HttpStatus.OK).body("Password has been reset successfully");
    }




    private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}
