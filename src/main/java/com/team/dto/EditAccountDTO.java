package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditAccountDTO {
    private String email;
    private String phoneNumber;
    private String customerName;
}
