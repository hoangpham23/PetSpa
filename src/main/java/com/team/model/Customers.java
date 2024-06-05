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
@Table(name = "CUSTOMERS")
public class Customers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CustomerID", nullable = false)
    private Integer customerID;
    
    @Nationalized
    @Column(name = "CustomerName", length = 100)
    private String customerName;

    @Nationalized
    @Column(name = "Email", length = 100)
    private String email;

    @Nationalized
    @Column(name = "PhoneNumber", length = 20)
    private String phoneNumber;

    @Column(name = "NumberOfPets")
    private Integer numberOfPets;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CustomerID", nullable = false)
    private Accounts accounts;

}

