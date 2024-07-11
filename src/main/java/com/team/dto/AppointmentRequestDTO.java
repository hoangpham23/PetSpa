package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestDTO {
    private Integer customerID;
    private List<Integer> serviceIds;
    private List<String> appointmentTimes;
    private Integer petID;
    private Double depositAmount;

}