package com.team.repository;

import com.team.model.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, Integer> {
    List<PaymentHistory> findByPaymentTimeBetween(LocalDateTime localDateTime, LocalDateTime localDateTime1);
}
