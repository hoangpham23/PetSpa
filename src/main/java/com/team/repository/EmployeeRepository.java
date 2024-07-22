package com.team.repository;

import com.team.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employees, Integer> {

    List<Employees> findAllByEmployeeNameContaining(String employeeName);
    List<Employees> findAllByStatus(String status);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByEmployeeCIN(String employeeCIN);
    boolean existsByPhoneNumberAndIdNot(String phoneNumber, int employeeID);
    boolean existsByEmailAndIdNot(String email, int employeeID);
    boolean existsByEmployeeCINAndIdNot(String employeeCIN, int employeeID);

}
