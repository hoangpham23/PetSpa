package com.team.service;

import com.team.dto.CustomerDTO;
import com.team.model.Accounts;
import com.team.model.Customers;
import com.team.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AccountService accountService;

    public CustomerService(CustomerRepository customerRepository, AccountService accountService){
        this.customerRepository = customerRepository;
        this.accountService = accountService;
    }

    public CustomerDTO getCustomerByAccountID(int accountID){
        Optional<Customers> customers = customerRepository.findById(accountID);
        if(customers.isPresent()){
            return convertToCustomerDTO(customers.get());
        }
        return null;
    }

    @Transactional
    public CustomerDTO createCustomer(String customerName, String phoneNumber, String email, String password) {
        // create an account first then create a customer
        Accounts accounts = accountService.createAccount(email, password);
        Customers customers = new Customers();
        customers.setCustomerName(customerName);
        customers.setPhoneNumber(phoneNumber);
        customers.setEmail(email);
        customers.setAccounts(accounts);
        customers.setNumberOfPets(0);
        return convertToCustomerDTO(customerRepository.save(customers));
    }

    private CustomerDTO convertToCustomerDTO(Customers customers) {
        CustomerDTO dto = new CustomerDTO();
        dto.setCustomerName(customers.getCustomerName());
        dto.setPhoneNumber(customers.getPhoneNumber());
        dto.setEmail(customers.getEmail());
        dto.setNumberOfPets(customers.getNumberOfPets());
        return dto;
    }

}
