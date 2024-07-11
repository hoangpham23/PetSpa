package com.team.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerFeedbackForEmployeeDTO {
    private String customerName;
    private String dogName;
    private String feedback;
    private String appointmentTime;
    private String imageURL;

}
