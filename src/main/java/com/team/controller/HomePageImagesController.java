package com.team.controller;

import com.team.dto.ServiceImageDTO;
import com.team.dto.ServicePageDTO;
import com.team.service.ServiceImagesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/home-page")
public class HomePageImagesController {
    private final ServiceImagesService serviceImagesService;
    private final Logger logger = LoggerFactory.getLogger(HomePageImagesController.class);

    public HomePageImagesController(ServiceImagesService serviceImagesService) {
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
    @GetMapping("/{serviceName}")
    public ResponseEntity<?> serviceDetails(@PathVariable String serviceName) {
        try {
            Optional<ServicePageDTO> serviceDetails = serviceImagesService.getServiceDetailsByName(serviceName);
            if (serviceDetails.isPresent()) {
                return new ResponseEntity<>(serviceDetails.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error in getting service details for name: {}", serviceName, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}