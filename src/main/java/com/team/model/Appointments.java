package com.team.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "APPOINTMENTS")
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AppointmentID", nullable = false)
    private Integer appointmentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CustomerID")
    private Customers customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ServiceID")
    private Services services;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EmployeeID")
    private Employees employees;

    @Column(name = "AppointmentTime")
    private Timestamp appointmentTime;

    @Column(name = "DepositAmount")
    private Double depositAmount;

    @Size(max = 20)
    @Column(name = "PaymentStatus", length = 20)
    private String paymentStatus;

    @Size(max = 20)
    @Column(name = "Status", length = 20)
    private String status;

    @Lob
    @Column(name = "Note")
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PetID")
    private Pets pets;

}