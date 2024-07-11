package com.team.repository;

import com.team.model.ServiceImages;
import com.team.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServicesImagesRepository extends JpaRepository<ServiceImages, Integer> {

    List<ServiceImages> findByServiceID(Services service);

    Optional<ServiceImages> findByImageURL(String imageURL);
}
