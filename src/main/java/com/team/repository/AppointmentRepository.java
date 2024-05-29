package com.team.repository;

import com.team.dto.AppointmentDTO;
import com.team.model.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointments, Integer> {

    @Query(value = "SELECT AppointmentTime, COUNT(*) AS AppointmentCount FROM APPOINTMENTS GROUP BY AppointmentTime", nativeQuery = true)
    List<Object[]> getAllAppointments();

}
