package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointServiceDTO {

    private int appointmentID;
    private String appointmentTime;
    private String serviceName;
}
