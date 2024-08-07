package com.team.repository;


import com.team.model.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointments, Integer> {
    String SQL_findAppointmentsAfterBefore  = "SELECT AppointmentTime, COUNT(*) AS AppointmentCount FROM PET_SPA.dbo.APPOINTMENTS WHERE AppointmentTime > :afterTime AND AppointmentTime < :beforeTime AND PaymentStatus = 'Paid' GROUP BY AppointmentTime ORDER BY AppointmentTime";
    String SQL_findLastEmployeeIDInADay = "SELECT TOP 1 EmployeeID FROM APPOINTMENTS WHERE CAST(AppointmentTime AS DATE) = :appointmentTime ORDER BY AppointmentID desc ";
    String SQL_findAllEmployeeInOneShift = "select EmployeeID from APPOINTMENTS where AppointmentTime = :appointmentTime AND PaymentStatus = 'Paid' order by employeeID";
    String SQL_findLastEmployeeID = "select top 1 EmployeeID, AppointmentTime from APPOINTMENTS order by AppointmentID desc";
    String SQL_findCustomerIDAndPaymentStatus = "SELECT * FROM APPOINTMENTS WHERE CustomerID = :customerID AND PaymentStatus = :paymentStatus";
    String SQL_findAppointmentsByPhoneNumberAndDate = "SELECT a.* FROM APPOINTMENTS a JOIN CUSTOMERS c ON a.CustomerID = c.CustomerID WHERE CAST(a.AppointmentTime AS DATE) = :appointmentTime AND c.PhoneNumber LIKE %:phoneNumber% AND a.status <> 'Not assign' ORDER BY a.AppointmentID desc ";
    @Query(value = SQL_findLastEmployeeIDInADay, nativeQuery = true)
    Optional<Integer> findLastEmployeeIDInADay(@Param("appointmentTime") String appointmentTime);

    @Query(value = SQL_findAppointmentsAfterBefore, nativeQuery = true)
    List<Object[]> findAppointmentsAfterBefore(@Param("afterTime") String afterTime, @Param("beforeTime") String beforeTime);

    @Query(value = SQL_findLastEmployeeID, nativeQuery = true)
    Optional<Integer> findLastEmployeeID();

    @Query(value = SQL_findAllEmployeeInOneShift , nativeQuery = true)
    List<Integer> findAllEmployeeInOneShift(@Param("appointmentTime") LocalDateTime appointmentTime);

    @Query(value = SQL_findCustomerIDAndPaymentStatus, nativeQuery = true)
    List<Appointments> SQL_findCustomerIDAndPaymentStatus(@Param("customerID") int customerID, @Param("paymentStatus") String paymentStatus);


    @Query("SELECT a FROM Appointments a " +
            "JOIN FETCH a.customer c " +
            "JOIN FETCH a.services s " +
            "JOIN FETCH a.pets p " +
            "WHERE a.appointmentTime >= :startOfDay AND a.appointmentTime <= :endOfDay AND a.status <> 'Not assign'")
    List<Appointments> findAppointmentsForDate(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);

    @Query(value = SQL_findAppointmentsByPhoneNumberAndDate, nativeQuery = true)
    List<Appointments> findAppointmentsByPhoneNumberAndDate(@Param("phoneNumber") String phoneNumber, @Param("appointmentTime") String appointmentTime);

}
