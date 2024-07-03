package com.team.repository;

import com.team.model.Appointments;
import com.team.model.Customers;
import com.team.model.Feedback;
import com.team.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByServiceID(Services serviceID);

    List<Feedback> findByAppointmentID(Appointments appointment);

    List<Feedback> findAllByCustomerIDAndStatus(Customers customer, String status);
}
