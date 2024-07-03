package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManageAppointmentDTO {
    private Integer appointmentID;
    private String appointmentTime;
    private String ServiceName;
    private String customerName;
    private String customerEmail;
    private String customerPhoneNumber;
    private String petName;
    private String status;
}
