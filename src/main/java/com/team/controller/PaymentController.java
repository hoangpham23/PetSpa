package com.team.controller;

import com.team.config.VNPayConfig;
import com.team.service.MomoService;
import com.team.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final VNPayConfig VNPayConfig;
    private final MomoService momoService;

    public PaymentController(PaymentService paymentService, VNPayConfig VNPayConfig, MomoService momoService) {
        this.paymentService = paymentService;
        this.VNPayConfig = VNPayConfig;
        this.momoService = momoService;
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
    public String status(HttpServletRequest request ,HttpServletResponse response) throws IOException {
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
            String fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
            String fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }


        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }

        int customerID = Integer.parseInt(request.getParameter("customerID"));
        String paymentStatus = "Pending";
        double amount = Double.parseDouble(request.getParameter("vnp_Amount"));
        String paymentTime = request.getParameter("vnp_PayDate");

        boolean check = paymentService.changePaymentStatus(customerID, paymentStatus);
        fields.remove("customerID");

        String signValue = VNPayConfig.hashAllFields(fields);
        if (signValue.equals(vnp_SecureHash)) {
            if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
                if (check){
                    paymentService.savePaymentHistory(customerID, amount, paymentTime);
                    log.info("Change paymentStatus successful");
                }
                return "Successful";
//                response.sendRedirect("http://localhost:3000/payment?status=successful");
            } else {
                return "Failed";
//                response.sendRedirect("http://localhost:3000/payment?status=failed");
            }

        } else {
            return "Wrong Secure Hash";
//            response.sendRedirect("http://localhost:3000/payment?status=failed");
        }

    }

    @GetMapping("/successful")
    public String successful(){
        return "Successful";
    }

    @GetMapping("/ipUrl")
    public String ipUrl(){
        return "ipUrl";
    }

    @GetMapping("/momo/{service}")
    public String momo(@RequestParam("amount") String amount ) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        String response = momoService.createPayment(amount);
        return response;
    }


}
