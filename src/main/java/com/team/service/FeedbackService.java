package com.team.service;

import com.team.dto.CustomerFeedbackForEmployeeDTO;
import com.team.model.Appointments;
import com.team.model.Customers;
import com.team.model.Feedback;
import com.team.model.ServiceImages;
import com.team.repository.AppointmentRepository;
import com.team.repository.FeedbackRepository;
import com.team.repository.ServicesImagesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final ServicesImagesRepository servicesImagesRepository;
    private final AppointmentRepository appointmentRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, ServicesImagesRepository servicesImagesRepository, AppointmentRepository appointmentRepository) {
        this.feedbackRepository = feedbackRepository;
        this.servicesImagesRepository = servicesImagesRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<CustomerFeedbackForEmployeeDTO> getFeedbackForEmployeeByAppointment(Integer appointmentID) {
        Optional<Appointments> appointmentOptional = appointmentRepository.findById(appointmentID);
        if (appointmentOptional.isEmpty()) {
            // Handle the case where the appointment is not found
            return List.of();
        }

        Appointments appointment = appointmentOptional.get();
        List<Feedback> feedbackList = feedbackRepository.findByAppointmentID(appointment);
        return feedbackList.stream()
                .map(feedback -> {
                    List<ServiceImages> serviceImages = servicesImagesRepository.findByServiceID(feedback.getAppointmentID().getServices());
                    String imageUrl = serviceImages.isEmpty() ? null : serviceImages.getFirst().getImageURL();
                    return new CustomerFeedbackForEmployeeDTO(
                            feedback.getCustomerID().getCustomerName(),
                            feedback.getAppointmentID().getPets().getPetName(),
                            feedback.getFeedbackContent(),
                            feedback.getAppointmentID().getAppointmentTime().toString(),
                            imageUrl
                    );
                })
                .collect(Collectors.toList());
    }

    public Optional<Feedback> getFeedbackByCustomerAndStatus(Customers customer, String status) {
        return feedbackRepository.findByCustomerIDAndStatus(customer, status);
    }

    public void updateFeedbackStatus(Feedback feedback, String status) {
        feedback.setStatus(status);
        feedbackRepository.save(feedback);
    }
}
