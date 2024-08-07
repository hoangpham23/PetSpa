package com.team.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "FEEDBACKS")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FeedbackID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ServiceID")
    private Services serviceID;

    @Lob
    @Column(name = "FeedbackContent")
    private String feedbackContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CustomerID")
    private Customers customerID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EmployeeID")
    private Employees employeeID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AppointmentID")
    private Appointments appointmentID;

    @Column(name = "Status")
    private String status;

}