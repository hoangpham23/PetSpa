package com.team.controller;

import com.team.dto.AddServiceDTO;
import com.team.dto.ManageServiceDTO;
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
            List<ManageServiceDTO> images = serviceImagesService.getServiceInformation();
            return new ResponseEntity<>(images, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error in getting all images", e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getServiceByName(@RequestParam String serviceName) {
        try {
            List<ManageServiceDTO> serviceDataList = serviceImagesService.searchServiceByName(serviceName);
            if (!serviceDataList.isEmpty()) {
                return new ResponseEntity<>(serviceDataList, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Service not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error("Error in getting service by name", e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping
    public ResponseEntity<?> addService(AddServiceDTO addServiceDTO) {
        try {

            Services service = serviceImagesService.addService(addServiceDTO);
            return new ResponseEntity<>(service, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/edit-service/{serviceId}")
    public ResponseEntity<?> editService(@PathVariable Integer serviceId,
                                         @RequestParam("serviceName") String serviceName,
                                         @RequestParam("description") String description,
                                         @RequestParam("price") Double price,
                                         @RequestParam("status") String status,
                                          @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            if (serviceName.isEmpty() || description.isEmpty()) {
                return new ResponseEntity<>("Service name, description cannot be empty", HttpStatus.BAD_REQUEST);
            }
            if(price <= 0) {
                return new ResponseEntity<>("Price cannot be negative", HttpStatus.BAD_REQUEST);
            }
            serviceImagesService.editService(serviceId, serviceName, description, price,status, image);
            return ResponseEntity.ok("Service has been updated");
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/delete-service/{serviceId}")
    public ResponseEntity<?> deleteService(@PathVariable Integer serviceId) {
        try {
            Services service = serviceImagesService.deactivateService(serviceId);
            if (service != null) {
                return ResponseEntity.ok("Service status has been updated to INACTIVE");
            } else {
                return new ResponseEntity<>("Service not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
