package com.team.service;

import com.team.dto.AppointServiceDTO;
import com.team.dto.PaymentHistoryDTO;
import com.team.model.Customers;
import com.team.model.PaymentDetail;
import com.team.model.PaymentHistory;
import com.team.repository.CustomerRepository;
import com.team.repository.PaymentDetailRepository;
import com.team.repository.PaymentHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PaymentHistoryService {

    private final static DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final Logger log = LoggerFactory.getLogger(PaymentHistoryService.class);
    private final CustomerRepository customerRepository;
    private final PaymentHistoryRepository paymentHistoryRepository;
    private final PaymentDetailRepository paymentDetailRepository;

    public PaymentHistoryService(CustomerRepository customerRepository, PaymentHistoryRepository paymentHistoryRepository, PaymentDetailRepository paymentDetailRepository) {
        this.customerRepository = customerRepository;
        this.paymentHistoryRepository = paymentHistoryRepository;
        this.paymentDetailRepository = paymentDetailRepository;
    }

    private List<PaymentHistoryDTO> getAllPaymentHistory(int customerID) {
        List<PaymentHistoryDTO> paymentHistoryDTOList = new ArrayList<>();
        Customers customers = customerRepository.findById(customerID).get();
        List<PaymentHistory> listPaymentHistory = paymentHistoryRepository.findAllByCustomers(customers);
        if (listPaymentHistory.isEmpty()) {
            throw new RuntimeException();
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        for (PaymentHistory ph : listPaymentHistory) {
            PaymentHistoryDTO dto = new PaymentHistoryDTO();
            dto.setPaymentTime(ph.getPaymentTime().toString());
            dto.setAmount(ph.getTotalAmount());
            Map<String, Object> data = getServiceName(ph);
            List<AppointServiceDTO> listService = (List<AppointServiceDTO>) data.get("listService");
            String petName = (String) data.get("petName");
            dto.setListService(listService);
            dto.setPetName(petName);
            paymentHistoryDTOList.add(dto);
        }

        Collections.sort(paymentHistoryDTOList, new Comparator<PaymentHistoryDTO>() {
            @Override
            public int compare(PaymentHistoryDTO dto1, PaymentHistoryDTO dto2) {
                try {
                    LocalDateTime time1 = LocalDateTime.parse(dto1.getPaymentTime().split("\\.")[0], formatter);
                    LocalDateTime time2 = LocalDateTime.parse(dto2.getPaymentTime().split("\\.")[0], formatter);
                    return time1.compareTo(time2);
                } catch (DateTimeParseException e) {
                    throw new RuntimeException("Error parsing date", e);
                }
            }
        });

        return paymentHistoryDTOList;
    }

    private Map<String, Object> getServiceName(PaymentHistory paymentHistory) {

        List<PaymentDetail> listDetail = paymentDetailRepository.findAllByPaymentHistoryID(paymentHistory);
        String petName = listDetail.getFirst().getAppointments().getPets().getPetName();
        List<AppointServiceDTO> listService = listDetail.stream()
                .map(pd -> new AppointServiceDTO(
                        pd.getAppointments().getAppointmentID(),
                        pd.getAppointments().getAppointmentTime().toLocalDateTime().format(FORMATTER),
                        pd.getAppointments().getServices().getServiceName()
                ))
                .sorted(Comparator.comparing(AppointServiceDTO::getAppointmentID))
                .collect(Collectors.toList());
        Map<String, Object> map = new HashMap<>();
        map.put("listService", listService);
        map.put("petName", petName);
        return map;
    }


    public Map<String, List<PaymentHistoryDTO>> getPaymentHistory(int customerID) {
        List<PaymentHistoryDTO> paymentHistory = getAllPaymentHistory(customerID);
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        List<PaymentHistoryDTO> completed = new ArrayList<>();
        List<PaymentHistoryDTO> upcoming = new ArrayList<>();

        for (PaymentHistoryDTO dto : paymentHistory) {
            boolean allServicesCompleted = true;
            for (AppointServiceDTO service : dto.getListService()) {
                try {
                    String appointmentTime = service.getAppointmentTime().split("\\.")[0]; // Remove milliseconds if present
                    LocalDateTime appointmentDateTime = LocalDateTime.parse(appointmentTime, formatter);
                    if (!appointmentDateTime.isBefore(now)) {
                        allServicesCompleted = false;
                        break;
                    }
                } catch (DateTimeParseException e) {
                    log.error("Error parsing date: {}", service.getAppointmentTime());
                    allServicesCompleted = false;
                    break;
                }
            }
            if (allServicesCompleted) {
                completed.add(dto);
            } else {
                upcoming.add(dto);
            }
        }

        Map<String, List<PaymentHistoryDTO>> result = new HashMap<>();
        result.put("completed", completed);
        result.put("upcoming", upcoming);

        return result;
    }
}
