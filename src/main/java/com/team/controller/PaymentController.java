package com.team.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import com.team.dto.AppointmentRequestDTO;
import com.team.model.PaymentDetail;
import com.team.service.EmailService;
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
    private final PaypalService paypalService;
    private final EmployeeService employeeService;
    private final EmailService emailService;


    public PaymentController(PaymentService paymentService, PaypalService paypalService, EmployeeService employeeService, EmailService emailService) {
        this.paymentService = paymentService;
        this.paypalService = paypalService;
        this.employeeService = employeeService;
        this.emailService = emailService;
    }

    // this function receive the information from front end
    // base on the method will use the function that have that method
    @PostMapping("")
    public ResponseEntity<?> paymentInfo(@RequestBody AppointmentRequestDTO data, HttpServletRequest request) {
        try {
            Map<String, String> dataResponse = new HashMap<>();
            String urlPaypal = createPaypal(data);
            dataResponse.put("urlPaypal", urlPaypal);

            return ResponseEntity.ok(dataResponse);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }




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
                List<PaymentDetail> paymentDetails = paymentService.savePaymentHistory(id, totalAmount, paymentMethod, appointmentID);
                emailService.sendEmailPayment(paymentDetails, "Invoice");
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
