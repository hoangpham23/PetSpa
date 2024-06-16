package com.team.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "PAYMENT_HISTORY")
public class PaymentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaymentID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AppointmentID")
    private Appointments appointmentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CustomerID")
    private Customers customerID;

    @Column(name = "PaymentAmount")
    private Double paymentAmount;

    @Size(max = 50)
    @Column(name = "PaymentMethod", length = 50)
    private String paymentMethod;

    @Column(name = "PaymentTime")
    private Instant paymentTime;

}