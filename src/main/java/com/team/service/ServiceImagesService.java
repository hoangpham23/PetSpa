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

import java.util.*;
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
                if ("ACTIVE".equals(services.getStatus())) {
                    result.add(new ServiceImageDTO(image.getImageID(), services.getId(), image.getImageURL(), services.getServiceName()));
                }
            }
        }
        return result;
    }

    public List<ManageServiceDTO> getServiceInformation() {
        List<ServiceImages> images = servicesImagesRepository.findAll();
        List<ManageServiceDTO> result = images.stream()
                .map(image -> {
                    Optional<Services> serviceOpt = Optional.ofNullable(image.getServiceID());
                    if (serviceOpt.isPresent()) {
                        Services services = serviceOpt.get();
                        return new ManageServiceDTO(image.getImageID(), services.getId(), image.getImageURL(), services.getServiceName(), services.getPrice(), services.getStatus());
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .sorted(Comparator.comparing(ManageServiceDTO::getStatus))
                .collect(Collectors.toList());

        return result;
    }

    public List<ChooseServiceDTO> chooseServicePage() {
        List<ServiceImages> images = servicesImagesRepository.findAll();
        List<ChooseServiceDTO> result = new ArrayList<>();

        for (ServiceImages image : images) {
            Optional<Services> serviceOpt = Optional.ofNullable(image.getServiceID());
            if (serviceOpt.isPresent()) {
                Services services = serviceOpt.get();
                if ("ACTIVE".equals(services.getStatus())) {
                    result.add(new ChooseServiceDTO(services.getId(), services.getServiceName(), image.getImageURL(), services.getPrice()));
                }
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
        // Check if service with the same name already exists
        Services existingService = getServiceByName(serviceDTO.getServiceName());
        if (existingService != null) {
            throw new Exception("A service with this name already exists!");
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

    public Services updateService(Services service) {
        // update the service in the database
        return serviceRepository.save(service);
    }

    public ServiceImages updateServiceImage(ServiceImages serviceImages) {
        // update the service image in the database
        return servicesImagesRepository.save(serviceImages);
    }

    public Services getServiceById(Integer serviceId) {
        return serviceRepository.findById(serviceId).orElse(null);
    }

    public ServiceImages getServiceImageByService(Services service) {
        return servicesImagesRepository.findByServiceID(service).stream().findFirst().orElse(null);
    }


    public Services editService(Integer serviceId, String serviceName, String description, Double price, String status, MultipartFile image) throws Exception {
        Services service = getServiceById(serviceId);

        if (service == null) {
            throw new Exception("Service not found");
        }

        // Check if serviceName is being changed and if so, check for duplicates
        if (!service.getServiceName().equals(serviceName)) {
            Optional<Services> existingServiceOpt = serviceRepository.findByServiceName(serviceName);
            if (existingServiceOpt.isPresent()) {
                throw new Exception("A service with this name already exists!");
            }
        }

        // Check if image with the same URL already exists
        if (!image.isEmpty()) {
            String fileName = image.getOriginalFilename();
            Optional<ServiceImages> existingImage = servicesImagesRepository.findByImageURL(fileName);
            if (existingImage.isPresent()) {
                throw new Exception("This image is invalid!");
            }
        }

        // Update the service details
        service.setServiceName(serviceName);
        service.setDescription(description);
        service.setPrice(price);
        service.setStatus(status);

        if (!image.isEmpty()) {
            String savedFileName = saveImage(image);
            String fileUrl = generateFileUrl(savedFileName);

            ServiceImages serviceImages = getServiceImageByService(service);
            serviceImages.setImageURL(fileUrl);
            updateServiceImage(serviceImages);
        }

        return updateService(service);
    }

    private String generateFileUrl(String fileName) {
        return "http://localhost:8090/" + UPLOAD_DIR + fileName;
    }

    public Services getServiceByName(String serviceName) {
        return serviceRepository.findByServiceName(serviceName).orElse(null);
    }

    public List<ManageServiceDTO> searchServiceByName(String serviceName) {
        List<Services> services = serviceRepository.findAllByServiceName(serviceName);
        return services.stream()
                .map(service -> {
                    ServiceImages serviceImage = servicesImagesRepository.findByServiceID(service).stream().findFirst().orElse(null);
                    String imageUrl = serviceImage != null ? serviceImage.getImageURL() : null;
                    return new ManageServiceDTO(serviceImage.getImageID(), service.getId(), imageUrl, service.getServiceName(), service.getPrice(), service.getStatus());
                })
                .sorted(Comparator.comparing(ManageServiceDTO::getStatus))
                .collect(Collectors.toList());
    }

    public Services deactivateService(Integer serviceId) {
        Services service = getServiceById(serviceId);
        if (service != null) {
            service.setStatus("INACTIVE");
            return updateService(service);
        }
        return null;
    }
}
