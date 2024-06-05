package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetDTO {
    private Integer petID;
    private String petName;
    private Integer age;
    private double weight;
    private Integer customerID;

}
