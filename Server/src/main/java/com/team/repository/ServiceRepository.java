package com.team.repository;

import com.team.model.Services;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Repository
public interface ServiceRepository extends ListCrudRepository<Services, Integer> {

    Optional<Services> findByServiceName(String serviceName);

    List<Services> findAllByServiceNameContaining(String serviceName);

    @Modifying
    @Transactional
    @Query("UPDATE Services s SET s.maxSlots = :newMaxSlots")
    void updateMaxSlotsForAllServices(@Param("newMaxSlots") Integer newMaxSlots);

    List<Services> findAllByStatus(String status);
}
