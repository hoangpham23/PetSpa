package com.team.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import com.team.config.VNPayConfig;
import com.team.dto.AppointmentRequestDTO;
import com.team.service.EmployeeService;
import com.team.service.PaymentService;
import com.team.service.PaypalService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.*;

import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {

    private static final String PAYMENT_SUCCESS = "http://localhost:3000/payment?status=successful";
    private static final String PAYMENT_CANCELED = "http://localhost:3000/payment?status=canceled";
    private static final String PAYMENT_FAILED = "http://localhost:3000/payment?status=failed";
    private final PaymentService paymentService;
    private final VNPayConfig VNPayConfig;
    private final PaypalService paypalService;
    private final EmployeeService employeeService;


    public PaymentController(PaymentService paymentService, VNPayConfig VNPayConfig, PaypalService paypalService, EmployeeService employeeService) {
        this.paymentService = paymentService;
        this.VNPayConfig = VNPayConfig;
        this.paypalService = paypalService;
        this.employeeService = employeeService;
    }

    // this function receive the information from front end
    // base on the method will use the function that have that method
    @PostMapping("")
    public ResponseEntity<?> paymentInfo(@RequestBody AppointmentRequestDTO data, HttpServletRequest request) {
        try {
            Map<String, String> dataResponse = new HashMap<>();
//            String urlVNPay = createVNPay(data, request);
//            if (urlVNPay == null) {
//                dataResponse.put("urlVNPAY", "error");
//            }
//            dataResponse.put("urlVNPAY", urlVNPay);
            String urlPaypal = createPaypal(data);
            dataResponse.put("urlPaypal", urlPaypal);

            return ResponseEntity.ok(dataResponse);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // this version return vnpay url
//    @PostMapping("/vn-pay")
    public String createVNPay(@RequestBody Map<String, Object> dataRequest, HttpServletRequest request) {
        try {
            return paymentService.paymentURL(dataRequest, request);
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }


    // check the status after completed payment and response direct to the website
    // response after complete vn_pay payment include success or failed
//    @GetMapping("/vn_pay/status")
//    public RedirectView status(HttpServletRequest request) throws UnsupportedEncodingException {
//        Map fields = new HashMap();
//        for (Enumeration params = request.getParameterNames(); params.hasMoreElements(); ) {
//            String fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
//            String fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
//            if ((fieldValue != null) && (fieldValue.length() > 0)) {
//                fields.put(fieldName, fieldValue);
//            }
//        }
//
//        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
//        if (fields.containsKey("vnp_SecureHashType")) {
//            fields.remove("vnp_SecureHashType");
//        }
//        if (fields.containsKey("vnp_SecureHash")) {
//            fields.remove("vnp_SecureHash");
//        }
//
//        int customerID = Integer.parseInt(request.getParameter("customerID"));
//        String paymentStatus = "Paid";
//        String paymentMethod = "VN_PAY";
//        double amount = Double.parseDouble(request.getParameter("vnp_Amount"));
//        // String paymentTime = request.getParameter("vnp_PayDate");
//
//        fields.remove("customerID");
//
//        String signValue = VNPayConfig.hashAllFields(fields);
//        String returnUrl = PAYMENT_FAILED;
//        if (signValue.equals(vnp_SecureHash)) {
//            if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
//                boolean check = paymentService.changePaymentStatus(customerID, paymentStatus);
//                if (check) {
//                    paymentService.savePaymentHistory(customerID, amount, paymentMethod);
//                    paymentService.sendEmail(customerID);
//                    log.info("Change paymentStatus successful");
//                    returnUrl = PAYMENT_SUCCESS;
//                }
//
//            } else {
//                paymentStatus = "Canceled";
//                boolean check = paymentService.changePaymentStatus(customerID, paymentStatus);
//                if (check) {
//                    paymentService.savePaymentHistory(customerID, amount, paymentMethod);
//                }
//                returnUrl = PAYMENT_CANCELED;
//            }
//
//        }
//
//        return new RedirectView(returnUrl);
//
//    }


    public String createPaypal(AppointmentRequestDTO data) {
        try {
            Payment payment = paypalService.createPayment(data);
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    return links.getHref();
                }
            }
        } catch (PayPalRESTException e) {
            log.error("Error occurred:: ", e);
        }
        return "error";
    }


    // check the status and response back to the website in front end
    @GetMapping("/success")
    public RedirectView paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId,
            @RequestParam("customerID") String customerID,
            @RequestParam("amount") String amount,
            @RequestParam("appointmentID") String appointmentID
    ) {
        String returnUrl = PAYMENT_FAILED;
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            String paymentStatus = "Paid";
            String paymentMethod = "PAYPAL";
            double totalAmount = Double.parseDouble(amount);
            if (payment.getState().equals("approved")) {
                int id = Integer.parseInt(customerID);
                paymentService.changePaymentStatus(id, paymentStatus);
                paymentService.savePaymentHistory(id, totalAmount, paymentMethod, appointmentID);
                paymentService.sendEmail(id);
                employeeService.assignSchedule(appointmentID);
                returnUrl = PAYMENT_SUCCESS;
            }

        }catch (Exception e) {
            log.error("Error occurred:: ", e);
        }
        return new RedirectView(returnUrl);
    }


    // if paypal payment is cancel return to this
    @GetMapping("/cancel")
    public RedirectView paymentCancel(@RequestParam("customerID") String customerID) {
        String paymentStatus = "Canceled";
        paymentService.changePaymentStatus(Integer.parseInt(customerID), paymentStatus);
        return new RedirectView(PAYMENT_CANCELED);
    }

    // if paypal payment is error return to this
    @GetMapping("/error")
    public RedirectView paymentError() {
        return new RedirectView(PAYMENT_FAILED);
    }

}
