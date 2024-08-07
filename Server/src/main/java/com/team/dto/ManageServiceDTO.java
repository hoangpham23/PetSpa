package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManageServiceDTO {
    private Integer imageId;
    private Integer serviceId;
    private String imageURL;
    private String serviceName;
    private String description;
    private Double price;
    private String status;
}
