package com.team.repository;

import com.team.model.Appointments;
import com.team.model.EmployeeSchedule;
import com.team.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface EmployeeScheduleRepository extends JpaRepository<EmployeeSchedule, Integer> {
    List<EmployeeSchedule> findAllByEmployeesAndWorkDateBetweenOrderByWorkDateAscStartTimeAsc (Employees employees, LocalDate startDate, LocalDate endDate);
    EmployeeSchedule findByAppointments(Appointments appointments);

    @Query(value = "SELECT CAST(CASE WHEN EXISTS ( " +
            "    SELECT 1 " +
            "    FROM EMPLOYEE_SCHEDULES " +
            "    WHERE EmployeeID = :employeeID " +
            "    AND WorkDate = :workDate " +
            "    AND CAST(StartTime AS TIME) = CAST(:startTime AS TIME) " +
            ") THEN 0 ELSE 1 END AS BIT)",
            nativeQuery = true)
    boolean existsByEmployeesIDAndWorkDateAndStartTime(
            @Param("employeeID") int employeeID,
            @Param("workDate") LocalDate workDate,
            @Param("startTime") LocalTime startTime);
}
