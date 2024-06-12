package com.team.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ACCOUNTS")
public class Accounts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AccountID", nullable = false)
    private Integer accountID;

//    @Nationalized
    @Column(name = "Email", length = 100)
    private String email;

    @Column(name = "Password", length = 50)
    private String password;

    @Column(name = "Role", length = 20)
    private String role;

    @Column(name = "OTP", length = 10)
    private String otp;
}
