package com.team.repository;

import com.team.model.Customers;
import com.team.model.Pets;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetDetailRepository extends JpaRepository<Pets, Integer>{
    boolean existsPetByPetNameAndCustomerID(String petName, Customers customer);

    List<Pets> findByCustomerID(Customers customer);
}
