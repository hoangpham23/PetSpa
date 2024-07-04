package com.team.repository;

import com.team.model.Services;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ServiceRepository extends ListCrudRepository<Services, Integer> {

    Optional<Services> findByServiceName(String serviceName);

    List<Services> findAllByServiceName(String serviceName);
}
