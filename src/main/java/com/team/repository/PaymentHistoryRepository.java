package com.team.repository;

import com.paypal.api.payments.Payment;
import com.team.model.Customers;
import com.team.model.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, Integer> {

    List<PaymentHistory> findAllByCustomers(Customers customers);
}
