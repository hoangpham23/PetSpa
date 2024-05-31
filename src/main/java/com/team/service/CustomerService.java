package com.team.service;

import com.team.model.Accounts;
import com.team.model.Customers;
import com.team.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AccountService accountService;

    public CustomerService(CustomerRepository customerRepository, AccountService accountService){
        this.customerRepository = customerRepository;
        this.accountService = accountService;
    }

    @Transactional
    public Customers createCustomer(String customerName, String phoneNumber, String email, String password) {
        // create an account first then create a customer
        Accounts accounts = accountService.createAccount(email, password);
        Customers customers = new Customers();
        customers.setCustomerName(customerName);
        customers.setPhoneNumber(phoneNumber);
        customers.setEmail(email);
        customers.setAccounts(accounts);
        return customerRepository.save(customers);
    }

}
