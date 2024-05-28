package com.team.service;


import com.team.model.Services;
import com.team.repository.ServiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FunctionService {

    private static final Logger logger = LoggerFactory.getLogger(FunctionService.class);
    private final ServiceRepository serviceRepository;

    public FunctionService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<Services> findServicesByName(String serviceName) {
        return serviceRepository.findFirstByServiceName(serviceName);
    }

}
