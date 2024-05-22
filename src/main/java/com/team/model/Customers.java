package com.team.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CUSTOMERS")
public class Customers {

    @Id
    private int customerID;
    private String customerName;
    private String email;
    private String phoneNumber;
    private int numberOfPets;
}
 