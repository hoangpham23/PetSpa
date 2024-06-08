package com.team.repository;

import com.team.model.EmployeeSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeScheduleRepository extends JpaRepository<EmployeeSchedule, Integer> {
}
