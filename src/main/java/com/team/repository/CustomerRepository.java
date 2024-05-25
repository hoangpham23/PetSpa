package com.team.repository;

import com.team.model.Customers;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends ListCrudRepository<Customers, Integer> {
Customers findByEmail(String email);
}
