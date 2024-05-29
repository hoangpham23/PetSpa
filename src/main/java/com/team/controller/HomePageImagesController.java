package com.team.controller;

import com.team.dto.ServiceImageDTO;
import com.team.model.Service;
import com.team.model.ServiceImages;
import com.team.model.Services;
import com.team.repository.ServiceRepository;
import com.team.repository.ServicesImagesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/home-page")
public class HomePageImagesController {
    private final ServicesImagesRepository servicesImagesRepository;
    private final ServiceRepository servicesRepository;

    public HomePageImagesController(ServicesImagesRepository servicesImagesRepository, ServiceRepository servicesRepository) {
        this.servicesImagesRepository = servicesImagesRepository;
        this.servicesRepository = servicesRepository;
    }

    @GetMapping("")
    public ResponseEntity<List<ServiceImageDTO>> getAllImages() {

        List<ServiceImages> images = servicesImagesRepository.findAll();
        List<ServiceImageDTO> result = new ArrayList<>();

        for (ServiceImages image : images) {
            Optional<Services> serviceOpt = servicesRepository.findById(image.getServiceID());
            if (serviceOpt.isPresent()) {
                Services service = serviceOpt.get();
                result.add(new ServiceImageDTO(image.getImageID(), image.getServiceID(), image.getImageURL(), service.getServiceName()));
            }
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}