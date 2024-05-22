package com.team.repository;

import com.team.model.Customer;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends ListCrudRepository<Customer, Integer> {
//    Customer findCustomerByAccountID(int accountID);
}
