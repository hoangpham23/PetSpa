package com.team.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PAYMENT_DETAIL")
public class PaymentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaymentDetailID", nullable = false)
    private Integer paymentDetailID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CustomerID")
    private Customers customers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AppointmentID")
    private Appointments appointments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PaymentHistoryID")
    private PaymentHistory paymentHistoryID;

}