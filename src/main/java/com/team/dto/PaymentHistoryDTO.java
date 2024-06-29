package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentHistoryDTO {

    private String paymentTime;
    private double amount;
    private List<AppointServiceDTO> listService;
    private String petName;

}
