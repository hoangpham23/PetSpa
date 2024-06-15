package com.team.service;

import com.team.dto.EmployeeDTO;
import com.team.model.Accounts;
import com.team.model.Employees;
import com.team.repository.AccountRepository;
import com.team.repository.EmployeeRepository;
import jakarta.persistence.Id;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployeeService {


    private final EmployeeRepository employeeRepository;
    private final AccountRepository accountRepository;
    private final AccountService accountService;

    public EmployeeService(EmployeeRepository employeeRepository, AccountRepository accountRepository, AccountService accountService) {
        this.employeeRepository = employeeRepository;
        this.accountRepository = accountRepository;
        this.accountService = accountService;
    }

    public List<EmployeeDTO> showAllEmployees() {
        List<Employees> employeesList = employeeRepository.findAllByStatus("ACTIVE");
        List<EmployeeDTO> result = new ArrayList<>();
        for (Employees employee : employeesList) {
            Accounts accounts = accountRepository.findById(employee.getId()).get();
            EmployeeDTO dto = new EmployeeDTO();
            dto.setEmployeeID(employee.getId());
            dto.setEmployeeName(employee.getEmployeeName());
            dto.setEmail(employee.getEmail());
            dto.setPassword(accounts.getPassword());
            dto.setPhoneNumber(employee.getPhoneNumber());
            dto.setEmployeeCIN(employee.getEmployeeCIN());
            dto.setGender(employee.getGender());
            result.add(dto);
        }

        return result;
    }

    public Employees deleteEmployee(Integer employeeID) throws Exception {
        Optional<Employees> employeeOptional = employeeRepository.findById(employeeID);
        if (employeeOptional.isPresent()) {
            Employees employee = employeeOptional.get();
            employee.setStatus("INACTIVE");
            return employeeRepository.save(employee);
        }

        return null;
    }

    public Employees createEmployee(Map<String, String> data){
        String name = data.get("name");
        String phoneNumber = data.get("phoneNumber");
        String email = data.get("email");
        String employeeCIN = data.get("employeeCIN");
        String gender = data.get("gender");
        String defaultPassword = "1234";
        String role = "EM";

        Accounts accounts = accountService.createAccount(email, defaultPassword, role );
        Employees employees = new Employees();
        employees.setId(accounts.getAccountID());
        employees.setEmployeeName(name);
        employees.setEmail(email);
        employees.setPhoneNumber(phoneNumber);
        employees.setEmployeeCIN(employeeCIN);
        employees.setGender(gender);
        employees.setStatus("ACTIVE");

        return employeeRepository.save(employees);
    }
}
