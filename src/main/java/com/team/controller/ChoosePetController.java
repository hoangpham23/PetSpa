package com.team.controller;

import com.team.model.Pets;
import com.team.service.PetDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/choose-pet")
public class ChoosePetController {

    private final PetDetailService petDetailService;

    @Autowired
    public ChoosePetController(PetDetailService petDetailService) {
        this.petDetailService = petDetailService;
    }

//@GetMapping("")
//public ResponseEntity<?> getPetsByCustomerId(@RequestBody Map<String, Integer> request) {
//    Integer customerID = request.get("customerID");
//    List<Pets> pets = petDetailService.getPetsByCustomerId(customerID);
//
//    if (pets == null || pets.isEmpty()) {
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("This account does not have any pets.");
//    }
//
//    return new ResponseEntity<>(pets, HttpStatus.OK);
//}
@PostMapping("")
public ResponseEntity<?> getPetsByCustomerId(@RequestBody Map<String, Integer> request) {
    Integer customerID = request.get("customerID");
    List<Pets> pets = petDetailService.getPetsByCustomerId(customerID);

    if (pets == null || pets.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("This account does not have any pets.");
    }

    return new ResponseEntity<>(pets, HttpStatus.OK);
}
}
