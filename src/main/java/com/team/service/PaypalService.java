package com.team.service;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
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

    public PaypalService(APIContext apiContext) {
        this.apiContext = apiContext;
    }

    public Payment createPayment(HttpServletRequest request) throws PayPalRESTException {
        Double total = Double.parseDouble(request.getParameter("amount"));
        String customerID = request.getParameter("customerID");
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
        String customUrl = "?customerID=" + customerID +"&amount=" + total;
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(CANCEL_URL +"?customerID=" + customerID);
        redirectUrls.setReturnUrl(SUCCESS_URL + customUrl);

        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
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

    public Payment createPayment(Map<String, String> data) throws PayPalRESTException {
        Double total = Double.parseDouble(data.get("amount"));
        String customerID = data.get("customerID");
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
        String customUrl = "?customerID=" + customerID +"&amount=" + total;
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
