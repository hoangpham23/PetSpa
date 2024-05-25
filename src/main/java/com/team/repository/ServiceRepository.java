package com.team.repository;

import com.team.model.Service;
import org.springframework.data.repository.ListCrudRepository;

public interface ServiceRepository extends ListCrudRepository<Service, Integer> {
}
