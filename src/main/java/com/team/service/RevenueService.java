//package com.team.service;
//
//import com.team.dto.RevenueDTO;
//import com.team.model.PaymentHistory;
//import com.team.repository.PaymentHistoryRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.time.LocalDate;
//import java.time.ZoneId;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@Service
//public class RevenueService {
//    @Autowired
//    private PaymentHistoryRepository paymentHistoryRepository;
//
//    public List<RevenueDTO> getWeeklyRevenue() {
//        List<PaymentHistory> paymentHistories = paymentHistoryRepository.findAll();
//
//        // Get the current date and the date 7 days ago
//        LocalDate today = LocalDate.now();
//        LocalDate sevenDaysAgo = today.minusDays(6);
//
//        // Filter payment histories to only include those within the last 7 days
//        List<PaymentHistory> last7DaysPayments = paymentHistories.stream()
//                .filter(ph -> {
//                    LocalDate paymentDate = ph.getPaymentTime().atZone(ZoneId.systemDefault()).toLocalDate();
//                    return !paymentDate.isBefore(sevenDaysAgo) && !paymentDate.isAfter(today);
//                })
//                .collect(Collectors.toList());
//
//        // Group by date
//        Map<LocalDate, List<PaymentHistory>> groupedByDate = last7DaysPayments.stream()
//                .collect(Collectors.groupingBy(
//                        ph -> ph.getPaymentTime().atZone(ZoneId.systemDefault()).toLocalDate()
//                ));
//
//        // Map to DTOs
//        return groupedByDate.entrySet().stream()
//                .map(entry -> {
//                    LocalDate date = entry.getKey();
//                    List<PaymentHistory> payments = entry.getValue();
//
//                    Double totalRevenue = payments.stream().mapToDouble(PaymentHistory::getPaymentAmount).sum();
//                    Long customerCount = (long) payments.size(); // Count all customer entries for the day
//
//                    return new RevenueDTO(date, totalRevenue, customerCount);
//                })
//                .collect(Collectors.toList());
//    }
//}
