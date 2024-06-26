package com.team.controller;

import com.team.dto.AddServiceDTO;
import com.team.model.Services;
import com.team.service.ServiceImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/add-service")
public class AddServiceController {

    @Autowired
    private ServiceImagesService serviceImagesService;

    @PostMapping
    public Services addService(@RequestParam("serviceName") String serviceName,
                               @RequestParam("description") String description,
                               @RequestParam("price") Double price,
                               @RequestParam("image") MultipartFile image) throws Exception {
        AddServiceDTO addserviceDTO = new AddServiceDTO();
        addserviceDTO.setServiceName(serviceName);
        addserviceDTO.setDescription(description);
        addserviceDTO.setPrice(price);
        addserviceDTO.setImage(image);
        return serviceImagesService.addService(addserviceDTO);
    }
}
