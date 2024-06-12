package com.team.controller;


import com.team.service.ServiceImagesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/choose-service")
public class ChooseServiceController {
    private final ServiceImagesService serviceImagesService;
    private final Logger logger = LoggerFactory.getLogger(HomePageImagesController.class);

    public ChooseServiceController(ServiceImagesService serviceImagesService) {
        this.serviceImagesService = serviceImagesService;
    }

    @GetMapping("")
    public ResponseEntity<?> chooseServicePage() {
        try {
            return ResponseEntity.ok(serviceImagesService.chooseServicePage());
        } catch (Exception e) {
            logger.error("Error in getting all images", e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
