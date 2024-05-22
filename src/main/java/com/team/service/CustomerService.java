package com.team.service;


import com.team.model.Customers;
import com.team.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

//    public Customer getCustomer(int accountID){
//        return customerRepository.findCustomerByAccountID(accountID);
//    }

    public Customers createCustomer(int customerID, String customerName, String phoneNumber, String email){
        Customers customers = new Customers();
        customers.setCustomerID(customerID);
        customers.setCustomerName(customerName);
        customers.setPhoneNumber(phoneNumber);
        customers.setEmail(email);
        return customerRepository.save(customers);
    }


}
