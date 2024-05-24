package com.team.repository;

import com.team.model.Services;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceRepository extends ListCrudRepository<Services, Integer> {

//    List<Services>  findAllByServiceName(String name);

    @Query("SELECT s FROM Services s WHERE s.serviceName LIKE CONCAT('%', :serviceName, '%')")
    List<Services> findFirstByServiceName(String serviceName);
}
