package com.team.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import com.team.config.VNPayConfig;
import com.team.service.PaymentService;
import com.team.service.PaypalService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final String PAYMENT_SUCCESS = "http://localhost:3000/payment?status=successful";
    private final String PAYMENT_CANCELED = "http://localhost:3000/payment?status=canceled";
    private final String PAYMENT_FAILED = "http://localhost:3000/payment?status=failed";
    private final PaymentService paymentService;
    private final VNPayConfig VNPayConfig;
    private final PaypalService paypalService;


    public PaymentController(PaymentService paymentService, VNPayConfig VNPayConfig, PaypalService paypalService) {
        this.paymentService = paymentService;
        this.VNPayConfig = VNPayConfig;
        this.paypalService = paypalService;
    }

    // this function receive the information from front end
    // base on the method will use the function that have that method
    @PostMapping("")
    public void paymentInfo(@RequestBody Map<String, String> data, HttpServletRequest request) {
        try {
            String method = data.get("method");
            if (("VN_PAY").equalsIgnoreCase(method)) {
                createVNPay(data, request);
            } else if (("PAYPAL").equalsIgnoreCase(method)) {
                createPaypal(data);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    // this version return vnpay url
//    @PostMapping("/vn-pay")
    public ResponseEntity<?> createVNPay(@RequestBody Map<String, String> dataRequest, HttpServletRequest request) {
        try {
            String paymentURL = paymentService.paymentURL(dataRequest, request);
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
    // change this into post mapping
    // this version redirect to vn_pay page
//    @GetMapping("/vn_pay")
    public ResponseEntity<?> createVNPay( HttpServletRequest request) {
        try {
            String paymentURL = paymentService.paymentURL(request);
            if (paymentURL == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(paymentURL))
                    .build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // check the status after completed payment and response direct to the website
    // response after complete vn_pay payment include success or failed
    @GetMapping("/vn_pay/status")
    public String status(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements(); ) {
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
        String paymentStatus = "Paid";
        String paymentMethod = "VN_PAY";
        double amount = Double.parseDouble(request.getParameter("vnp_Amount"));
        // String paymentTime = request.getParameter("vnp_PayDate");

        fields.remove("customerID");

        String signValue = VNPayConfig.hashAllFields(fields);
        if (signValue.equals(vnp_SecureHash)) {
            if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
                boolean check = paymentService.changePaymentStatus(customerID, paymentStatus);
                if (check) {
                    paymentService.savePaymentHistory(customerID, amount, paymentMethod);
                    paymentService.sendEmail(customerID);
                    log.info("Change paymentStatus successful");
                }
                return "Successful";
            } else {
                paymentStatus = "Canceled";
                boolean check = paymentService.changePaymentStatus(customerID, paymentStatus);
                if (check) {
                    paymentService.savePaymentHistory(customerID, amount, paymentMethod);
                }
                return "Canceled";
            }

        } else {
            return "Wrong Secure Hash";
        }

    }


    // change this into post
    // create paypal payment and redirect to paypal site
    @GetMapping("/paypal")
    public RedirectView createPaypal(HttpServletRequest request) {
        try {
            Payment payment = paypalService.createPayment(request);
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    return new RedirectView(links.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            log.error("Error occurred:: ", e);
        }
        return new RedirectView("/payment/error");
    }

    @PostMapping("/paypal")
    public RedirectView createPaypal(@RequestBody Map<String, String> data) {
        try {
            Payment payment = paypalService.createPayment(data);
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    return new RedirectView(links.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            log.error("Error occurred:: ", e);
        }
        return new RedirectView("/payment/error");
    }


    // check the status and response back to the website in front end
    @GetMapping("/success")
    public String paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId,
            @RequestParam("customerID") String customerID,
            @RequestParam("amount") String amount
    ) {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            String paymentStatus = "Paid";
            String paymentMethod = "PAYPAL";
            double totalAmount = Double.parseDouble(amount);
            if (payment.getState().equals("approved")) {
                int id = Integer.parseInt(customerID);
                boolean check = paymentService.changePaymentStatus(id, paymentStatus);
                if (check) {
                    paymentService.savePaymentHistory(id, totalAmount, paymentMethod);
                    paymentService.sendEmail(id);
                    return "paymentSuccess";
                }
            }

            return "paymentError";
        } catch (PayPalRESTException e) {
            log.error("Error occurred:: ", e);
            return "paymentError";
        }
    }


    // if paypal payment is cancel return to this
    @GetMapping("/cancel")
    public String paymentCancel(@RequestParam("customerID") String customerID ) {
        String paymentStatus = "Canceled";
        boolean check = paymentService.changePaymentStatus(Integer.parseInt(customerID), paymentStatus);
        if (!check){
            log.error("error at paymentCancel. Can't change the paymentStatus");
        }
        return "paymentCancel";
    }

    // if paypal payment is error return to this
    @GetMapping("/error")
    public String paymentError() {
        return "paymentError";
    }

}
