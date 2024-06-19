package com.team.service;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import com.team.dto.AppointmentRequestDTO;
import com.team.model.Appointments;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class PaypalService {

    private final APIContext apiContext;
    private static final String CANCEL_URL = "http://localhost:8090/payment/cancel";
    private static final String SUCCESS_URL = "http://localhost:8090/payment/success";
    private final AppointmentService appointmentService;

    public PaypalService(APIContext apiContext, AppointmentService appointmentService) {
        this.apiContext = apiContext;
        this.appointmentService = appointmentService;
    }


    public Payment executePayment(
            String paymentId,
            String payerId
    ) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        return payment.execute(apiContext, paymentExecution);
    }

    public Payment createPayment(AppointmentRequestDTO data) throws PayPalRESTException {
        double total = data.getDepositAmount();
        int customerID = data.getCustomerID();
        List<Appointments> listAppointments = appointmentService.createAppointment(data);
        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(String.format(Locale.forLanguageTag("USD"), "%.2f", total)); // 9.99$ - 9,99€

        Transaction transaction = new Transaction();
//        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("Paypal");

        Payment payment = new Payment();
//        StringBuilder customUrl = new StringBuilder("?customerID=" + customerID + "&amount=" + total);
//        if (listAppointmentID != null) {
//            for (Integer appointmentID : listAppointmentID) {
//                customUrl.append("&appointmentID=").append(appointmentID);
//            }
//        }

        StringBuilder customUrl = new StringBuilder("?customerID=" + customerID + "&amount=" + total);
        if (listAppointments != null) {
            for (Appointments appointment : listAppointments) {
                customUrl.append("&appointmentID=").append(appointment.getAppointmentID());
            }
        }

        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(CANCEL_URL +"?customerID=" + customerID);
        redirectUrls.setReturnUrl(SUCCESS_URL + customUrl);

        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }
}
