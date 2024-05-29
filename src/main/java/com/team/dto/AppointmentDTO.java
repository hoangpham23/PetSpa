package com.team.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {

    private Instant appointmentTime;
    private Integer appointmentCount;
}
