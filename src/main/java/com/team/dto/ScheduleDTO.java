package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {

    private Integer appointmentID;
    private LocalTime startTime;
    private LocalTime endTime;
    private String serviceName;
    private String customerName;
    private String appointmentStatus;

}
