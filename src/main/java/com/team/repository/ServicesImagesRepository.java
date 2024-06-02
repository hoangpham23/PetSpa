package com.team.repository;

import com.team.model.ServiceImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServicesImagesRepository extends JpaRepository<ServiceImages, Integer> {

    List<ServiceImages> findByServiceID(Integer serviceID);
}
