package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentHistoryDTO {

    private int paymentID;
    private String paymentTime;
    private double amount;
    private List<String> listService;
    private String petName;
    private int numberOfPets;

}
