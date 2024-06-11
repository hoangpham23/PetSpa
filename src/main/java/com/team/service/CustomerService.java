package com.team.service;

import com.team.dto.CustomerDTO;
import com.team.dto.EditAccountDTO;
import com.team.model.Accounts;
import com.team.model.Customers;
import com.team.repository.AccountRepository;
import com.team.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AccountService accountService;
    private final AccountRepository accountRepository;

    public CustomerService(CustomerRepository customerRepository, AccountService accountService, AccountRepository accountRepository){
        this.customerRepository = customerRepository;
        this.accountService = accountService;
        this.accountRepository = accountRepository;
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
    public boolean checkPhoneNumber(String phoneNumber) {
        return customerRepository.existsAccountByPhoneNumber(phoneNumber);
    }


    public EditAccountDTO editCustomer(Integer customerID, String customerName, String email, String phoneNumber) {
        Customers customers = customerRepository.findById(customerID).get();
        Accounts accounts = accountRepository.findById(customerID).get();
        customers.setCustomerName(customerName);
        customers.setEmail(email);
        accounts.setEmail(email);
        customers.setPhoneNumber(phoneNumber);
        customerRepository.save(customers);
        accountRepository.save(accounts);
        EditAccountDTO dto = new EditAccountDTO();
        dto.setCustomerName(customers.getCustomerName());
        dto.setEmail(customers.getEmail());
        dto.setPhoneNumber(customers.getPhoneNumber());

        return dto;
    }

}
