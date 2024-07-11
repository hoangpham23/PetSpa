package com.team.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RescheduleDTO {
    private List<Integer> appointmentID;
    private List<String> appointmentTime;
}
