package com.team.service;

import com.team.dto.RevenueDTO;
import com.team.model.Appointments;
import com.team.model.PaymentDetail;
import com.team.model.PaymentHistory;
import com.team.repository.AppointmentRepository;
import com.team.repository.PaymentDetailRepository;
import com.team.repository.PaymentHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RevenueService {
    @Autowired
    private PaymentHistoryRepository paymentHistoryRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PaymentDetailRepository paymentDetailRepository;

    public List<RevenueDTO> getRevenue(LocalDate startDate, LocalDate endDate) {
        List<PaymentHistory> paymentHistories = paymentHistoryRepository.findAll();
        List<Appointments> appointments = appointmentRepository.findAll();
        List<PaymentDetail> paymentDetails = paymentDetailRepository.findAll();

        // Filter payment histories to only include those within the specified date range
        List<PaymentHistory> paymentsInRange = paymentHistories.stream()
                .filter(ph -> {
                    LocalDate paymentDate = ph.getPaymentTime().toLocalDateTime().toLocalDate();
                    return !paymentDate.isBefore(startDate) && !paymentDate.isAfter(endDate);
                })
                .collect(Collectors.toList());

        // Collect customer IDs who made payments in the specified date range
        List<Integer> customerIds = paymentsInRange.stream()
                .map(ph -> ph.getCustomers().getCustomerID())
                .distinct()
                .collect(Collectors.toList());

        // Filter payment details to only include those related to payments in the specified date range
        List<PaymentDetail> paymentDetailsInRange = paymentDetails.stream()
                .filter(pd -> paymentsInRange.contains(pd.getPaymentHistoryID()))
                .collect(Collectors.toList());

        // Filter appointments to only include those with customers who made payments in the specified date range
        List<Appointments> relevantAppointments = appointments.stream()
                .filter(ap -> customerIds.contains(ap.getCustomer().getCustomerID()))
                .collect(Collectors.toList());

        // Group appointments by date
        Map<LocalDate, List<Appointments>> groupedAppointmentsByDate = relevantAppointments.stream()
                .collect(Collectors.groupingBy(
                        ap -> ap.getAppointmentTime().toLocalDateTime().toLocalDate()
                ));

        // Group payments by date
        Map<LocalDate, List<PaymentHistory>> groupedPaymentsByDate = paymentsInRange.stream()
                .collect(Collectors.groupingBy(
                        ph -> ph.getPaymentTime().toLocalDateTime().toLocalDate()
                ));

        // Map to DTOs
        List<RevenueDTO> revenueDTOs = startDate.datesUntil(endDate.plusDays(1))
                .map(date -> {
                    List<PaymentHistory> paymentsForDate = groupedPaymentsByDate.getOrDefault(date, List.of());
                    // Filter payment details for the current date
                    List<PaymentDetail> paymentDetailsForDate = paymentDetailsInRange.stream()
                            .filter(pd -> pd.getPaymentHistoryID().getPaymentTime().toLocalDateTime().toLocalDate().isEqual(date))
                            .collect(Collectors.toList());

                    Double totalRevenue = paymentsForDate.stream().mapToDouble(PaymentHistory::getTotalAmount).sum();
                    Long orderCount = (long) paymentsForDate.size();

                    // Count the number of times each service has been ordered on the specific date
                    Map<String, Long> serviceCount = paymentDetailsForDate.stream()
                            .collect(Collectors.groupingBy(pd -> pd.getAppointmentID().getServices().getServiceName(), Collectors.counting()));

                    Long customerCount = paymentsForDate.stream()
                            .map(ph -> ph.getCustomers().getCustomerID())
                            .count();
                    
                    // Calculate customer payment counts for the specific date
                    Map<String, Long> customerPaymentDetails = paymentsForDate.stream()
                            .collect(Collectors.groupingBy(ph -> ph.getCustomers().getCustomerName(), Collectors.counting()));

                    return new RevenueDTO(date, totalRevenue, orderCount, serviceCount, customerCount, customerPaymentDetails);
                }).collect(Collectors.toList());

        return revenueDTOs;
    }
}
