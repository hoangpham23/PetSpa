package com.team.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChooseServiceDTO {
    private int serviceID;
    private String serviceName;
    private String imageURl;
    private double price;
}
