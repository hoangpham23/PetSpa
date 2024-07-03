package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerFeedbackDTO {
    private Integer feedbackID;
    private String appointmentTime;
    private String serviceName;
    private String petName;
}
