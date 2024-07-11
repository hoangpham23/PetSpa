package com.team.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {

    private String appointmentTime;
    private Integer appointmentCount;
}
