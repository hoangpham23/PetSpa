package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Integer customerID;
    private String customerName;
    private String email;
    private String phoneNumber;
    private Integer numberOfPets;
    private String role;
    private String token;
}
