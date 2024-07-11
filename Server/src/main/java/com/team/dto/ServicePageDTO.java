package com.team.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServicePageDTO{
    private Integer imageId;
    private Integer serviceId;
    private String imageURL;
    private String serviceName;
    private Double price;
    private String description;
    private List<FeedbackDTO> feedbacks;
}

