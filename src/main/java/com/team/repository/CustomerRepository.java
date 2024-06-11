package com.team.repository;

import com.team.model.Customers;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends ListCrudRepository<Customers, Integer> {
    Customers findByEmail(String email);
    boolean existsAccountByPhoneNumber(String phoneNumber);
}
