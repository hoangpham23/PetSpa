package com.team.dto;

import com.team.model.Employees;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {

    private Integer employeeID;
    private String employeeName;
    private String email;
    private String password;
    private String phoneNumber;
    private String employeeCIN;
    private String gender;


}
