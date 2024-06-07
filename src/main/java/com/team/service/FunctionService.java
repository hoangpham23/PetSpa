package com.team.service;


import com.team.dto.ServiceDTO;
import com.team.model.Services;
import com.team.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FunctionService {

    private final ServiceRepository serviceRepository;

    public FunctionService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceDTO> getServices() {
        List<ServiceDTO> serviceDTO = new ArrayList<>();
        for (Services service : serviceRepository.findAll()) {
            serviceDTO.add(convertToDTO(service));
        }

        return serviceDTO;
    }

    private ServiceDTO convertToDTO(Services services){
        ServiceDTO dto = new ServiceDTO();
        dto.setServiceName(services.getServiceName());
        dto.setPrice(services.getPrice());
        return dto;
    }

}
