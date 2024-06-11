package com.team.controller;

import com.team.service.PaymentService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("")
    public ResponseEntity<?> payment(HttpServletRequest request) {
        try {
            String paymentURL = paymentService.paymentURL(request);
            if (paymentURL == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            Map<String, String> data = new HashMap<>();
            data.put("paymentURL", paymentURL);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @GetMapping("/status")
    public void status(HttpServletRequest request ,HttpServletResponse response) throws IOException {
        if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
            response.sendRedirect("http://localhost:3000/payment?status=successful");
            return;
        }
        response.sendRedirect("http://localhost:3000/payment?status=failed");
    }


}
