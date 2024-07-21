package com.team.service;

import com.team.dto.*;
import com.team.model.Customers;
import com.team.model.Feedback;
import com.team.model.ServiceImages;
import com.team.model.Services;

import com.team.repository.FeedbackRepository;
import com.team.repository.ServiceRepository;
import com.team.repository.ServicesImagesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
                        return new ManageServiceDTO(image.getImageID(), services.getId(), image.getImageURL(), services.getServiceName(),services.getDescription(), services.getPrice(), services.getStatus());
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

            // Filter feedbacks by status "Had feedback" and map to FeedbackDTO
            List<FeedbackDTO> feedbackDTOs = feedbacks.stream()
                    .filter(feedback -> "Had feedback".equals(feedback.getStatus()))
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
        if (serviceDTO.getServiceName().isEmpty() || serviceDTO.getDescription().isEmpty()) {
            throw  new Exception("Service name, description cannot be empty");
        }
        if (serviceDTO.getPrice() <= 0) {
            throw new Exception("Price cannot be negative");
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
        service.setStatus("ACTIVE");
        service.setMaxSlots(serviceRepository.findAllByStatus("ACTIVE").getFirst().getMaxSlots());

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

        // Track the previous image URL
        ServiceImages currentServiceImage = getServiceImageByService(service);
        String currentImageUrl = currentServiceImage != null ? currentServiceImage.getImageURL() : null;
        String newImageUrl = currentImageUrl; // Initialize with the current image URL

        // Check if a new image is provided and if it's different from the current image
        if (image != null && !image.isEmpty()) {
            String newFileName = image.getOriginalFilename();

            // Check if the new image filename is different from the current image URL
            if (currentImageUrl == null || !currentImageUrl.endsWith(newFileName)) {
                // Check if the new image URL already exists
                Optional<ServiceImages> existingImage = servicesImagesRepository.findByImageURL(generateFileUrl(newFileName));
                if (existingImage.isPresent()) {
                    throw new Exception("This image is invalid!");
                }

                // Save the new image
                String savedFileName = saveImage(image);
                newImageUrl = generateFileUrl(savedFileName);

                if (currentServiceImage != null) {
                    currentServiceImage.setImageURL(newImageUrl);
                    updateServiceImage(currentServiceImage);
                } else {
                    // If there's no existing image for this service, create a new one
                    ServiceImages newServiceImage = new ServiceImages();
                    newServiceImage.setServiceID(service);
                    newServiceImage.setImageURL(newImageUrl);
                    updateServiceImage(newServiceImage);
                }

                // Delete the previous image file if a new image has been uploaded
                if (currentImageUrl != null && !currentImageUrl.equals(newImageUrl)) {
                    deleteImageFile(currentImageUrl);
                }
            }
        }

        // Update the service details
        service.setServiceName(serviceName);
        service.setDescription(description);
        service.setPrice(price);
        service.setStatus(status);

        return updateService(service);
    }

    private void deleteImageFile(String imageUrl) {
        // Extract the filename from the image URL
        String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        Path filePath = Paths.get(UPLOAD_DIR, filename);

        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            // Handle the exception, e.g., log it
            e.printStackTrace();
        }
    }


    private String generateFileUrl(String fileName) {
        return "http://localhost:8090/" + UPLOAD_DIR + fileName;
    }

    public Services getServiceByName(String serviceName) {
        return serviceRepository.findByServiceName(serviceName).orElse(null);
    }

    public List<ManageServiceDTO> searchServiceByName(String serviceName) {
        List<Services> services = serviceRepository.findAllByServiceNameContaining(serviceName);
        return services.stream()
                .map(service -> {
                    ServiceImages serviceImage = servicesImagesRepository.findByServiceID(service).stream().findFirst().orElse(null);
                    String imageUrl = serviceImage != null ? serviceImage.getImageURL() : null;
                    return new ManageServiceDTO(serviceImage.getImageID(), service.getId(), imageUrl, service.getServiceName(),service.getStatus(), service.getPrice(), service.getStatus());
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
