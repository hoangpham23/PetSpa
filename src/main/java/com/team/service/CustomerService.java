package com.team.service;

import com.team.model.Accounts;
import com.team.model.Customers;
import com.team.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository){

        this.customerRepository = customerRepository;
    }

    public Customers checkMail(String email){
        return customerRepository.findByEmail(email);
    }
    public void update(Customers customers){
        customerRepository.save(customers);
    }
}
