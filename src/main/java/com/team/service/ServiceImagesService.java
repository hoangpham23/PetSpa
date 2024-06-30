package com.team.service;

import com.team.dto.*;
import com.team.model.Customers;
import com.team.model.Feedback;
import com.team.model.ServiceImages;
import com.team.model.Services;

import com.team.repository.FeedbackRepository;
import com.team.repository.ServiceRepository;
import com.team.repository.ServicesImagesRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


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
    public List<ChooseServiceDTO> chooseServicePage() {
        List<ServiceImages> images = servicesImagesRepository.findAll();
        List<ChooseServiceDTO> result = new ArrayList<>();

        for (ServiceImages image : images) {
            Optional<Services> serviceOpt = Optional.ofNullable(image.getServiceID());
            if (serviceOpt.isPresent()) {
                Services services = serviceOpt.get();
                result.add(new ChooseServiceDTO(services.getId(),services.getServiceName(),image.getImageURL(), services.getPrice()));
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

    private final String UPLOAD_DIR = "uploads/";

    public Services addService(AddServiceDTO serviceDTO) throws Exception {
        // Check if image with the same name already exists
        MultipartFile image = serviceDTO.getImage();
        // Check if image is provided
        if (image == null || image.isEmpty()) {
            throw new Exception("This image is invalid!");
        }

        // Check if image with the same name already exists
        String fileName = image.getOriginalFilename();
        Optional<ServiceImages> existingImage = servicesImagesRepository.findByImageURL(generateFileUrl(fileName));
        if (existingImage.isPresent()) {
            throw new Exception("This image is invalid!");
        }

        // Save the service
        Services service = new Services();
        service.setServiceName(serviceDTO.getServiceName());
        service.setDescription(serviceDTO.getDescription());
        service.setPrice(serviceDTO.getPrice());

        Services savedService = serviceRepository.save(service);

        // Save the image
        String savedFileName = saveImage(image);
        String fileUrl = generateFileUrl(savedFileName);
        ServiceImages serviceImages = new ServiceImages();
        serviceImages.setServiceID(savedService);
        serviceImages.setImageURL(fileUrl);
        servicesImagesRepository.save(serviceImages);

        return savedService;
    }


    private String saveImage(MultipartFile imageFile) throws IOException {
        String filename = imageFile.getOriginalFilename();
        Path uploadPath = Paths.get(UPLOAD_DIR);

        // Ensure the directory exists
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(filename);
        Files.copy(imageFile.getInputStream(), filePath);

        return filename;
    }

    private String generateFileUrl(String fileName) {
        return "http://localhost:8090/" + UPLOAD_DIR + fileName;
    }

}

