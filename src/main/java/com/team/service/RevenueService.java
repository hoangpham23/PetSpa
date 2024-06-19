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

    public List<RevenueDTO> getWeeklyRevenue() {
        List<PaymentHistory> paymentHistories = paymentHistoryRepository.findAll();
        List<Appointments> appointments = appointmentRepository.findAll();
        List<PaymentDetail> paymentDetails = paymentDetailRepository.findAll();

        // Get the current date and the date 7 days ago
        LocalDate today = LocalDate.now();
        LocalDate sevenDaysAgo = today.minusDays(6);

        // Filter payment histories to only include those within the last 7 days
        List<PaymentHistory> last7DaysPayments = paymentHistories.stream()
                .filter(ph -> {
                    LocalDate paymentDate = ph.getPaymentTime().toLocalDateTime().toLocalDate();
                    return !paymentDate.isBefore(sevenDaysAgo) && !paymentDate.isAfter(today);
                })
                .collect(Collectors.toList());

        // Collect customer IDs who made payments in the last 7 days
        List<Integer> customerIds = last7DaysPayments.stream()
                .map(ph -> ph.getCustomers().getCustomerID())
                .distinct()
                .collect(Collectors.toList());

        // Filter payment details to only include those related to payments in the last 7 days
        List<PaymentDetail> last7DaysPaymentDetails = paymentDetails.stream()
                .filter(pd -> last7DaysPayments.contains(pd.getPaymentHistoryID()))
                .collect(Collectors.toList());

        // Filter appointments to only include those with customers who made payments in the last 7 days
        List<Appointments> relevantAppointments = appointments.stream()
                .filter(ap -> customerIds.contains(ap.getCustomer().getCustomerID()))
                .collect(Collectors.toList());

        // Group appointments by date
        Map<LocalDate, List<Appointments>> groupedAppointmentsByDate = relevantAppointments.stream()
                .collect(Collectors.groupingBy(
                        ap -> ap.getAppointmentTime().toLocalDateTime().toLocalDate()
                ));

        // Group payments by date
        Map<LocalDate, List<PaymentHistory>> groupedPaymentsByDate = last7DaysPayments.stream()
                .collect(Collectors.groupingBy(
                        ph -> ph.getPaymentTime().toLocalDateTime().toLocalDate()
                ));

        // Map to DTOs
        List<RevenueDTO> revenueDTOs = sevenDaysAgo.datesUntil(today.plusDays(1))
                .map(date -> {
                    List<PaymentHistory> paymentsForDate = groupedPaymentsByDate.getOrDefault(date, List.of());
                    List<Appointments> apptsForDate = groupedAppointmentsByDate.getOrDefault(date, List.of());

                    // Filter payment details for the current date
                    List<PaymentDetail> paymentDetailsForDate = last7DaysPaymentDetails.stream()
                            .filter(pd -> pd.getPaymentHistoryID().getPaymentTime().toLocalDateTime().toLocalDate().isEqual(date))
                            .collect(Collectors.toList());

                    Double totalRevenue = paymentsForDate.stream().mapToDouble(PaymentHistory::getTotalAmount).sum();
                    Long orderCount = (long) paymentsForDate.size();

                    // Count the number of times each service has been ordered on the specific date
                    Map<String, Long> serviceCount = paymentDetailsForDate.stream()
                            .collect(Collectors.groupingBy(pd -> pd.getAppointmentID().getServices().getServiceName(), Collectors.counting()));

                    // Calculate customer payment counts for the specific date
                    Map<String, Long> customerPaymentCounts = paymentsForDate.stream()
                            .collect(Collectors.groupingBy(ph -> ph.getCustomers().getCustomerName(), Collectors.counting()));

                    return new RevenueDTO(date, totalRevenue, orderCount, serviceCount, customerPaymentCounts);
                }).collect(Collectors.toList());

        return revenueDTOs;
    }
}
