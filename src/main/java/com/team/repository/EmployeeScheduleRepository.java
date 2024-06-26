package com.team.repository;

import com.team.model.EmployeeSchedule;
import com.team.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeScheduleRepository extends JpaRepository<EmployeeSchedule, Integer> {
    List<EmployeeSchedule> findAllByEmployeesAndWorkDateBetweenOrderByWorkDateAscStartTimeAsc (Employees employees, LocalDate startDate, LocalDate endDate);
}
