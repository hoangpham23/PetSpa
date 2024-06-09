package com.team.service;

import com.team.model.Customers;
import com.team.model.Pets;
import com.team.repository.CustomerRepository;
import com.team.repository.PetDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetDetailService {

    private final PetDetailRepository petDetailRepository;

    private final CustomerRepository CustomerRepository;

    @Autowired
    public PetDetailService(PetDetailRepository petDetailRepository,CustomerRepository customerRepository) {
        this.petDetailRepository = petDetailRepository;
        this.CustomerRepository = customerRepository;
    }

    public boolean existsPetByPetNameAndCustomerID(String petName, Customers customer) {
        return petDetailRepository.existsPetByPetNameAndCustomerID(petName, customer);
    }



    public Pets createPet(String petName, int age, double weight, Customers customer) {
        Pets pet = new Pets();
        pet.setPetName(petName);
        pet.setAge(age);
        pet.setWeight(weight);
        pet.setCustomerID(customer);
        return petDetailRepository.save(pet);
    }

    public Customers findCustomerById(Integer customerID) {
        return CustomerRepository.findById(customerID).orElseThrow(() -> new IllegalArgumentException("Customer not found"));
    }
    public void saveCustomer(Customers customer) {
        CustomerRepository.save(customer);
    }

    public List<Pets> getPetsByCustomerId(Integer customerId) {
        Customers customer = findCustomerById(customerId);
        return petDetailRepository.findByCustomerID(customer);
    }
}
