package com.team.service;


import com.team.model.Customer;
import com.team.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

//    public Customer getCustomer(int accountID){
//        return customerRepository.findCustomerByAccountID(accountID);
//    }

    public Customer createCustomer(int customerID, String customerName, String phoneNumber, String email){
        Customer customer = new Customer();
        customer.setCustomerID(customerID);
        customer.setCustomerName(customerName);
        customer.setPhoneNumber(phoneNumber);
        customer.setEmail(email);
        return customerRepository.save(customer);
    }


}
