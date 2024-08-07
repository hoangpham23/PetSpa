package com.team.service;

import com.team.dto.CustomerFeedbackDTO;
import com.team.dto.CustomerFeedbackForEmployeeDTO;
import com.team.model.Appointments;
import com.team.model.Customers;
import com.team.model.Feedback;
import com.team.model.ServiceImages;
import com.team.repository.AppointmentRepository;
import com.team.repository.FeedbackRepository;
import com.team.repository.ServicesImagesRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
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
        Appointments appointment = appointmentRepository.findById(appointmentID)
                .orElseThrow(() -> new NoSuchElementException("Appointment not found"));

        List<Feedback> feedbackList = feedbackRepository.findByAppointmentID(appointment);

        if (feedbackList.isEmpty() || feedbackList.stream().allMatch(feedback ->
                "Have not feedback".equalsIgnoreCase(feedback.getStatus()) || "Don't feedback".equalsIgnoreCase(feedback.getStatus()))) {
            return Collections.emptyList();
        }
        SimpleDateFormat outputFormat = new SimpleDateFormat("MM-dd-yyyy HH:mm");

        return feedbackList.stream()
                .map(feedback -> {
                    List<ServiceImages> serviceImages = servicesImagesRepository.findByServiceID(feedback.getAppointmentID().getServices());
                    String imageUrl = serviceImages.isEmpty() ? null : serviceImages.getFirst().getImageURL();
                    String formattedAppointmentTime = outputFormat.format(feedback.getAppointmentID().getAppointmentTime());

                    return new CustomerFeedbackForEmployeeDTO(
                            feedback.getCustomerID().getCustomerName(),
                            feedback.getAppointmentID().getPets().getPetName(),
                            feedback.getFeedbackContent(),
                            formattedAppointmentTime,
                            imageUrl
                    );
                })
                .collect(Collectors.toList());
    }

    public Optional<Feedback> getFeedbackByCustomerAndStatus(Customers customer, String status) {
        List<Feedback> feedbacks = feedbackRepository.findAllByCustomerIDAndStatus(customer, status);
        return feedbacks.isEmpty() ? Optional.empty() : Optional.of(feedbacks.getFirst());
    }

    public void updateFeedbackStatus(Feedback feedback, String status) {
        feedback.setStatus(status);
        feedbackRepository.save(feedback);
    }

    public List<CustomerFeedbackDTO> getFeedbacksByCustomerAndStatus(Customers customer, String status) {
        List<Feedback> feedbacks = feedbackRepository.findAllByCustomerIDAndStatus(customer, status);
        return feedbacks.stream()
                .map(feedback -> new CustomerFeedbackDTO(
                        feedback.getId(),
                        feedback.getAppointmentID().getAppointmentTime().toString(),
                        feedback.getAppointmentID().getServices().getServiceName(),
                        feedback.getAppointmentID().getPets().getPetName()))
                .collect(Collectors.toList());
    }

    public Optional<Feedback> getFeedbackByID(Integer feedbackID) {
        return feedbackRepository.findById(feedbackID);
    }
}
