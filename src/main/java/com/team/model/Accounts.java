package com.team.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ACCOUNTS")
public class Accounts {

    @Id
    @Column(name = "AccountID")
    private int AccountID;

    @Column(name = "Email")
    private String Email;

    @Column(name = "Password")
    private String Password;

    @Column(name = "Role")
    private String Role;

}
