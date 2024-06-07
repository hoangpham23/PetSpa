package com.team.repository;


import com.team.model.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointments, Integer> {
    String SQL_countAppointmentTime = "SELECT AppointmentTime, COUNT(*) AS AppointmentCount FROM APPOINTMENTS GROUP BY AppointmentTime";
    String SQL_findAppointmentsAfterBefore  = "SELECT AppointmentTime, COUNT(*) AS AppointmentCount FROM PET_SPA.dbo.APPOINTMENTS WHERE AppointmentTime > :afterTime AND AppointmentTime < :beforeTime GROUP BY AppointmentTime ORDER BY AppointmentTime";
    String SQL_findLastEmployeeID = "SELECT TOP 1 EmployeeID FROM APPOINTMENTS WHERE CAST(AppointmentTime AS DATE) = :appointmentTime ORDER BY AppointmentID desc ";
    String SQL_allShiftsInADay = "SELECT EmployeeID, COUNT(*) AS count FROM APPOINTMENTS WHERE AppointmentTime > :startTime and AppointmentTime < :endTime GROUP BY EmployeeID ORDER BY EmployeeID";
    String SQL_findAllEmployeeInOneShift = "select EmployeeID from APPOINTMENTS where AppointmentTime = :appointmentTime order by employeeID";

    @Query(value = SQL_findLastEmployeeID, nativeQuery = true)
    List<Object[]> findLastEmployeeID(@Param("appointmentTime") String appointmentTime);

    @Query(value = SQL_findAppointmentsAfterBefore, nativeQuery = true)
    List<Object[]> findAppointmentsAfterBefore(@Param("afterTime") String afterTime, @Param("beforeTime") String beforeTime);

    @Query(value = SQL_allShiftsInADay,  nativeQuery = true)
    List<Object[]> findAllShifts(@Param("startTime") String startTime, @Param("endTime") String endTime);

    @Query(value = SQL_countAppointmentTime , nativeQuery = true)
    List<Object[]> getAllAppointments();

    @Query(value = SQL_findAllEmployeeInOneShift , nativeQuery = true)
    List<Integer> findAllEmployeeInOneShift(@Param("appointmentTime") LocalDateTime appointmentTime);

//    @Query(value = "SELECT AppointmentTime, COUNT(*) AS AppointmentCount FROM PET_SPA.dbo.APPOINTMENTS WHERE AppointmentTime > :afterTime AND AppointmentTime < :beforeTime GROUP BY AppointmentTime ORDER BY AppointmentTime", nativeQuery = true)
//    List<Object[]> findAppointmentsAfterBefore(@Param("afterTime") String afterTime, @Param("beforeTime") String beforeTime);
}
