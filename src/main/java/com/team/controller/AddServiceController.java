package com.team.controller;

import com.team.dto.AddServiceDTO;
import com.team.model.Services;
import com.team.service.ServiceImagesService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/add-service")
public class AddServiceController {

    private final ServiceImagesService serviceImagesService;

    public AddServiceController(ServiceImagesService serviceImagesService) {
        this.serviceImagesService = serviceImagesService;
    }

    @PostMapping
    public ResponseEntity<?> addService(@RequestParam("serviceName") String serviceName,
                                        @RequestParam("description") String description,
                                        @RequestParam("price") Double price,
                                        @RequestParam("image") MultipartFile image) {
        try {
            AddServiceDTO addServiceDTO = new AddServiceDTO();
            addServiceDTO.setServiceName(serviceName);
            addServiceDTO.setDescription(description);
            addServiceDTO.setPrice(price);
            addServiceDTO.setImage(image);
            Services service = serviceImagesService.addService(addServiceDTO);
            return new ResponseEntity<>(service, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
