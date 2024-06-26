package com.team.controller;

import com.team.dto.PetDTO;
import com.team.model.Customers;
import com.team.model.Pets;
import com.team.service.PetDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/insert-pet-info")
public class InsertPetInfoController {
    private final PetDetailService petDetailService;

    public InsertPetInfoController(PetDetailService petDetailService) {
        this.petDetailService = petDetailService;
    }

    @PostMapping("")
    public ResponseEntity<?> insertPetInfo(@RequestBody Map<String, String> data) {

        String petName = data.get("petName");
        double weight = Double.parseDouble(data.get("weight"));
        int age = Integer.parseInt(data.get("age"));
        Integer customerID = Integer.parseInt(data.get("customerID"));

        Customers customer = petDetailService.findCustomerById(customerID);

        // Check if pet name already exists in the database for the customer
        if (petDetailService.existsPetByPetNameAndCustomerID(petName, customer)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Pet name already exists");
        }

        // Create and add the pet detail
        Pets createdPet = petDetailService.createPet(petName, age, weight, customer);

        customer.setNumberOfPets(customer.getNumberOfPets() + 1);
        petDetailService.saveCustomer(customer);

        //save the pet detail
        PetDTO petDTO = new PetDTO();
        petDTO.setPetID(createdPet.getId());
        petDTO.setPetName(createdPet.getPetName());
        petDTO.setAge(createdPet.getAge());
        petDTO.setCustomerID(customerID);
        petDTO.setWeight(createdPet.getWeight());

        return ResponseEntity.status(HttpStatus.CREATED).body(petDTO);
    }
}

