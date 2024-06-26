package com.team.repository;

import com.team.model.PaymentDetail;
import com.team.model.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentDetailRepository extends JpaRepository<PaymentDetail, Integer> {

    List<PaymentDetail> findAllByPaymentHistoryID(PaymentHistory paymentHistory);
}
