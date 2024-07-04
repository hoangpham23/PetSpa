package com.team.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "SERVICES")
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ServiceID", nullable = false)
    private Integer id;

    @Size(max = 100)
    @Column(name = "ServiceName", length = 100)
    private String serviceName;

    @Lob
    @Column(name = "Description")
    private String description;

    @Column(name = "Price")
    private Double price;


    @Size(max = 20)
    @Column(name = "Status", length = 20)
    private String status;

}