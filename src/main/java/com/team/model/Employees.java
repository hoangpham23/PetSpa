package com.team.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "EMPLOYEES")
public class Employees {
    @Id
    @Column(name = "EmployeeID", nullable = false)
    private Integer id;

    @Size(max = 100)
    @Nationalized
    @Column(name = "EmployeeName", length = 100)
    private String employeeName;

    @Size(max = 100)
    @Nationalized
    @Column(name = "Email", length = 100)
    private String email;

    @Size(max = 20)
    @Nationalized
    @Column(name = "PhoneNumber", length = 20)
    private String phoneNumber;

    @Size(max = 20)
    @Nationalized
    @Column(name = "EmployeeCIN", length = 20)
    private String employeeCIN;

    @Size(max = 10)
    @Nationalized
    @Column(name = "Gender", length = 10)
    private String gender;


    @Size(max = 10)
    @Column(name = "Status", length = 10)
    private String status;

}