package com.team.service;

import com.team.dto.ServiceImageDTO;
import com.team.dto.ServicePageDTO;
import com.team.model.ServiceImages;
import com.team.model.Services;
import com.team.repository.ServiceRepository;
import com.team.repository.ServicesImagesRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceImagesService {
    private final ServicesImagesRepository servicesImagesRepository;
    private final ServiceRepository serviceRepository;

    public ServiceImagesService(ServicesImagesRepository servicesImagesRepository, ServiceRepository serviceRepository) {
        this.servicesImagesRepository = servicesImagesRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceImageDTO> getHomePageImages(){

        List<ServiceImages> images = servicesImagesRepository.findAll();
        List<ServiceImageDTO> result = new ArrayList<>();

        for (ServiceImages image : images) {
            Optional<Services> serviceOpt = serviceRepository.findById(image.getServiceID());
            if (serviceOpt.isPresent()) {
                Services service = serviceOpt.get();
                result.add(new ServiceImageDTO(image.getImageID(), image.getServiceID(), image.getImageURL(), service.getServiceName()));
            }
        }
        return result;
    }

    public Optional<ServicePageDTO> getServiceDetailsByName(String serviceName) {
        Optional<Services> serviceOpt = serviceRepository.findByServiceName(serviceName);
        if (serviceOpt.isPresent()) {
            Services services = serviceOpt.get();
            List<ServiceImages> images = servicesImagesRepository.findByServiceID(services.getId());
            // If images are found, construct the ServiceImageDTO
            if (!images.isEmpty()) {
                ServiceImages image = images.getFirst(); // Assuming one image per service for simplicity
                ServicePageDTO servicePageDTO = new ServicePageDTO(image.getImageID(), image.getServiceID(), image.getImageURL(), services.getServiceName(), services.getDescription());
                return Optional.of(servicePageDTO);
            }
        }
        return Optional.empty();
    }
}
