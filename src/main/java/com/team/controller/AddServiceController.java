package com.team.controller;

import com.team.dto.AddServiceDTO;
import com.team.dto.ServiceImageDTO;
import com.team.model.Services;
import com.team.service.ServiceImagesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/add-service")
public class AddServiceController {

    private final ServiceImagesService serviceImagesService;
    private final Logger logger = LoggerFactory.getLogger(HomePageImagesController.class);


    public AddServiceController(ServiceImagesService serviceImagesService) {
        this.serviceImagesService = serviceImagesService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllImages() {
        try {
            List<ServiceImageDTO> images = serviceImagesService.getHomePageImages();
            return new ResponseEntity<>(images, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error in getting all images", e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
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
