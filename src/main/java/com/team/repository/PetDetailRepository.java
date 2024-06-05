package com.team.repository;

import com.team.model.Customers;
import com.team.model.Pets;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetDetailRepository extends JpaRepository<Pets, Integer>{
    boolean existsPetByPetNameAndCustomerID(String petName, Customers customer);
}
