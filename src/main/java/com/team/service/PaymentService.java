package com.team.service;

import com.team.model.*;
import com.team.repository.*;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PaymentService {

    private final static DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private final AppointmentRepository appointmentRepository;
    private final CustomerRepository customerRepository;
    private final PaymentHistoryRepository paymentHistoryRepository;
    private final PaymentDetailRepository paymentDetailRepository;


    public PaymentService( AppointmentRepository appointmentRepository, CustomerRepository customerRepository, PaymentHistoryRepository paymentHistoryRepository, PaymentDetailRepository paymentDetailRepository) {
        this.appointmentRepository = appointmentRepository;
        this.customerRepository = customerRepository;
        this.paymentHistoryRepository = paymentHistoryRepository;
        this.paymentDetailRepository = paymentDetailRepository;
    }



    public void changePaymentStatus(int customerID, String paymentStatus) {
        List<Appointments> list = appointmentRepository.SQL_findCustomerIDAndPaymentStatus(customerID, "Pending");
        for (Appointments appointments : list) {
            if (("Pending").equalsIgnoreCase(appointments.getPaymentStatus())) {
                appointments.setPaymentStatus(paymentStatus);
                appointmentRepository.save(appointments);
            }

        }
    }

    public List<PaymentDetail> savePaymentHistory(int customerID, double totalAmount, String paymentMethod, String appointmentID) {
        Customers customers = customerRepository.findById(customerID).get();
        String paymentTime = LocalDateTime.now().format(FORMATTER);
        List<PaymentDetail> result = new ArrayList<>();
        PaymentHistory paymentHistory = new PaymentHistory();
        paymentHistory.setCustomers(customers);
        paymentHistory.setTotalAmount(totalAmount);
        paymentHistory.setPaymentMethod(paymentMethod);
        paymentHistory.setPaymentTime(Timestamp.valueOf(paymentTime));
        PaymentHistory savePayment = paymentHistoryRepository.save(paymentHistory);
        StringTokenizer tokenizer = new StringTokenizer(appointmentID, ",");
        while (tokenizer.hasMoreTokens()) {
            PaymentDetail paymentDetail = new PaymentDetail();
            paymentDetail.setCustomers(customers);
            Appointments appointments = appointmentRepository.findById(Integer.parseInt(tokenizer.nextToken())).get();
            paymentDetail.setAppointments(appointments);
            paymentDetail.setPaymentHistory(savePayment);
            result.add(paymentDetailRepository.save(paymentDetail));
        }
        return result;
    }



}
