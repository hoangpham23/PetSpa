package com.team.controller;

import com.team.dto.PaymentHistoryDTO;
import com.team.service.PaymentHistoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/payment-history")
public class PaymentHistoryController {

    private final PaymentHistoryService paymentHistoryService;

    public PaymentHistoryController(PaymentHistoryService paymentHistoryService) {
        this.paymentHistoryService = paymentHistoryService;
    }

    @PostMapping("")
    public ResponseEntity<?> showPaymentHistory(@RequestBody Map<String, String> data) {
        try {
            int customerID = Integer.parseInt(data.get("customerID"));
            System.out.println("customerID: " + customerID);
            List<PaymentHistoryDTO> listHistory = paymentHistoryService.getAllPaymentHistory(customerID);
            return new ResponseEntity<>(listHistory, HttpStatus.OK);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No payment history found");
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
