package com.team.service;

import com.team.dto.AppointmentDTO;
import com.team.model.Appointments;
import com.team.repository.AppointmentRepository;
import org.springframework.data.repository.query.parser.Part;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }


    public List<AppointmentDTO> getAllAppointments() {
        // retrieve data from the data
        List<Object[]> listAppointments = appointmentRepository.getAllAppointments();

        // convert into appointmentDTO type
        List<AppointmentDTO> result = new ArrayList<>();
        for (Object row[] : listAppointments) {
            Timestamp appointmentTime = (Timestamp) row[0];
            Integer count = (Integer) row[1];
            if (count != 3) {
                result.add(new AppointmentDTO(appointmentTime.toInstant(), count));
            }
        }

        return result;
    }


}
