package com.team.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PETS")
public class Pets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PetID", nullable = false)
    private Integer id;

    @Size(max = 100)
    @Nationalized
    @Column(name = "PetName", length = 100)
    private String petName;

    @Column(name = "Age")
    private Integer age;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CustomerID")
    private Customers customerID;

    @Column(name = "Weight")
    private Double weight;

}