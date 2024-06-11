package com.team.service;

import com.team.dto.FeedbackDTO;
import com.team.dto.ServiceImageDTO;
import com.team.dto.ServicePageDTO;
import com.team.model.Customers;
import com.team.model.Feedback;
import com.team.model.ServiceImages;
import com.team.model.Services;

import com.team.repository.FeedbackRepository;
import com.team.repository.ServiceRepository;
import com.team.repository.ServicesImagesRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceImagesService {
    private final ServicesImagesRepository servicesImagesRepository;
    private final ServiceRepository serviceRepository;
    private final FeedbackRepository feedbackRepository;

    public ServiceImagesService(ServicesImagesRepository servicesImagesRepository, ServiceRepository serviceRepository, FeedbackRepository feedbackRepository) {
        this.servicesImagesRepository = servicesImagesRepository;
        this.serviceRepository = serviceRepository;
        this.feedbackRepository = feedbackRepository;
    }

    public List<ServiceImageDTO> getHomePageImages() {
        List<ServiceImages> images = servicesImagesRepository.findAll();
        List<ServiceImageDTO> result = new ArrayList<>();

        for (ServiceImages image : images) {
            Optional<Services> serviceOpt = Optional.ofNullable(image.getServiceID());
            if (serviceOpt.isPresent()) {
                Services services = serviceOpt.get();
                result.add(new ServiceImageDTO(image.getImageID(), services.getId(), image.getImageURL(), services.getServiceName()));
            }
        }
        return result;
    }

    public Optional<ServicePageDTO> getServiceDetailsByName(String serviceName) {
        Optional<Services> serviceOpt = serviceRepository.findByServiceName(serviceName);
        if (serviceOpt.isPresent()) {
            Services service = serviceOpt.get();
            List<ServiceImages> images = servicesImagesRepository.findByServiceID(service);
            List<Feedback> feedbacks = feedbackRepository.findByServiceID(service);

            // Extract feedback content and customer name
            List<FeedbackDTO> feedbackDTOs = feedbacks.stream()
                    .map(feedback -> {
                        Customers customer = feedback.getCustomerID();
                        String customerName = customer.getCustomerName();
                        return new FeedbackDTO(feedback.getFeedbackContent(), customerName);
                    })
                    .collect(Collectors.toList());

            if (!images.isEmpty()) {
                ServiceImages image = images.getFirst(); // get the first image
                ServicePageDTO servicePageDTO = new ServicePageDTO(image.getImageID(), service.getId(), image.getImageURL(), service.getServiceName(), service.getPrice(), service.getDescription(), feedbackDTOs);
                return Optional.of(servicePageDTO);
            }
        }
        return Optional.empty();
    }
}

