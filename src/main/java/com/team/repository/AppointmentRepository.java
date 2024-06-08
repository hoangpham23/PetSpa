package com.team.repository;


import com.team.model.Appointments;
import com.team.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointments, Integer> {
//    String SQL_countAppointmentTime = "SELECT AppointmentTime, COUNT(*) AS AppointmentCount FROM APPOINTMENTS GROUP BY AppointmentTime";
    String SQL_findAppointmentsAfterBefore  = "SELECT AppointmentTime, COUNT(*) AS AppointmentCount FROM PET_SPA.dbo.APPOINTMENTS WHERE AppointmentTime > :afterTime AND AppointmentTime < :beforeTime GROUP BY AppointmentTime ORDER BY AppointmentTime";
    String SQL_findLastEmployeeIDInADay = "SELECT TOP 1 EmployeeID FROM APPOINTMENTS WHERE CAST(AppointmentTime AS DATE) = :appointmentTime ORDER BY AppointmentID desc ";
//    String SQL_allShiftsInADay = "SELECT EmployeeID, COUNT(*) AS count FROM APPOINTMENTS WHERE AppointmentTime > :startTime and AppointmentTime < :endTime GROUP BY EmployeeID ORDER BY EmployeeID";
    String SQL_findAllEmployeeInOneShift = "select EmployeeID from APPOINTMENTS where AppointmentTime = :appointmentTime order by employeeID";
    String SQL_findLastEmployeeID = "select top 1 EmployeeID, AppointmentTime from APPOINTMENTS order by AppointmentID desc";

    /**
     * @param appointmentTime base on this param to convert into a date type like this format 'yyyy-MM-dd'
     * find the last employeeId in a specific day from the request
     * @return
     */
    @Query(value = SQL_findLastEmployeeIDInADay, nativeQuery = true)
    Optional<Integer> findLastEmployeeIDInADay(@Param("appointmentTime") String appointmentTime);

    @Query(value = SQL_findAppointmentsAfterBefore, nativeQuery = true)
    List<Object[]> findAppointmentsAfterBefore(@Param("afterTime") String afterTime, @Param("beforeTime") String beforeTime);

    @Query(value = SQL_findLastEmployeeID, nativeQuery = true)
    Optional<Integer> findLastEmployeeID();

    @Query(value = SQL_findAllEmployeeInOneShift , nativeQuery = true)
    List<Integer> findAllEmployeeInOneShift(@Param("appointmentTime") LocalDateTime appointmentTime);

//    @Query(value = "SELECT AppointmentTime, COUNT(*) AS AppointmentCount FROM PET_SPA.dbo.APPOINTMENTS WHERE AppointmentTime > :afterTime AND AppointmentTime < :beforeTime GROUP BY AppointmentTime ORDER BY AppointmentTime", nativeQuery = true)
//    List<Object[]> findAppointmentsAfterBefore(@Param("afterTime") String afterTime, @Param("beforeTime") String beforeTime);
}
