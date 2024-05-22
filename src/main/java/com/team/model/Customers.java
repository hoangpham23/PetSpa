package com.team.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "CUSTOMERS")
public class Customers {
    @Id
    @Column(name = "CustomerID")
    private int customerID;

    @Column(name = "CustomerName")
    private String customerName;

    @Column(name = "email")
    private String email;

    @Column(name = "PhoneNumber")
    private String phoneNumber;

    @Column(name = "NumberOfPets")
    private int numberOfPets;


//    @OneToOne(mappedBy = "customers")
//    private ForgotPassword forgotPassWord;
}
