package com.team.repository;

import com.team.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employees, Integer> {

    List<Employees> findAllByStatus(String status);
    Employees findAllByIdAndStatus(int id, String status);
}
