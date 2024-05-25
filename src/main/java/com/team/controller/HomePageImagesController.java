package com.team.controller;

import com.team.dto.ServiceImageDTO;
import com.team.model.Service;
import com.team.model.ServiceImages;
import com.team.repository.ServiceRepository;
import com.team.repository.ServicesImagesRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
    @ResponseBody
    public List<ServiceImageDTO> getAllImages() {

        List<ServiceImages> images = servicesImagesRepository.findAll();
        List<ServiceImageDTO> result = new ArrayList<>();

        for (ServiceImages image : images) {
            Optional<Service> serviceOpt = servicesRepository.findById(image.getServiceID());
            if (serviceOpt.isPresent()) {
                Service service = serviceOpt.get();
                result.add(new ServiceImageDTO(image.getImageID(), image.getServiceID(), image.getImageURL(), service.getServiceName()));
            }
        }

        return result;
    }
}

//    @GetMapping("/images/name")
//    @ResponseBody
//    public Optional<ServiceImages> getAllImageByName(@RequestBody Map<String,String>  images){
//        String serviceName = images.get("serviceName");
//        Integer id = Integer.parseInt(images.get("id"));
//
//        SpaServices spaServices = servicesRepository.findServiceByName(serviceName);
//        if (spaServices == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No image");
//        }
//        return servicesImagesRepository.findById(id);
//    }
//@GetMapping("/images/name")
//@ResponseBody
//public ResponseEntity<?> getAllImageByName(@RequestParam String serviceName, @RequestParam Integer id) {
//    SpaServices spaServices = servicesRepository.findServiceByName(serviceName);
//    if (spaServices == null) {
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service not found");
//    }
//
//    Optional<ServiceImages> serviceImage = servicesImagesRepository.findById(id);
//    if (serviceImage.isPresent()) {
//        return ResponseEntity.ok(serviceImage.get());
//    } else {
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
//    }
//}
//}
