package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentHistoryDTO {

    private String paymentTime;
    private double amount;
    private List<AppointServiceDTO> listService;
    private String petName;


    public PaymentHistoryDTO(PaymentHistoryDTO pd, List<AppointServiceDTO> listService){
        this.paymentTime = pd.getPaymentTime();
        this.amount = pd.getAmount();
        this.listService = new ArrayList<>(listService);
        this.petName = pd.getPetName();
    }
}
