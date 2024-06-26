package com.team.service;

import com.team.dto.PaymentHistoryDTO;
import com.team.model.Customers;
import com.team.model.PaymentDetail;
import com.team.model.PaymentHistory;
import com.team.repository.CustomerRepository;
import com.team.repository.PaymentDetailRepository;
import com.team.repository.PaymentHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentHistoryService {


    private final CustomerRepository customerRepository;
    private final PaymentHistoryRepository paymentHistoryRepository;
    private final PaymentDetailRepository paymentDetailRepository;

    public PaymentHistoryService(CustomerRepository customerRepository, PaymentHistoryRepository paymentHistoryRepository, PaymentDetailRepository paymentDetailRepository) {
        this.customerRepository = customerRepository;
        this.paymentHistoryRepository = paymentHistoryRepository;
        this.paymentDetailRepository = paymentDetailRepository;
    }

    public List<PaymentHistoryDTO> getAllPaymentHistory(int customerID) {
        List<PaymentHistoryDTO> paymentHistoryDTOList = new ArrayList<>();
        Customers customers = customerRepository.findById(customerID).get();
        List<PaymentHistory> listPaymentHistory = paymentHistoryRepository.findAllByCustomers(customers);
        if (listPaymentHistory.isEmpty()) {
            throw new RuntimeException();
        }
        for (PaymentHistory ph : listPaymentHistory) {
            PaymentHistoryDTO dto = new PaymentHistoryDTO();
            dto.setPaymentTime(ph.getPaymentTime().toString());
            dto.setAmount(ph.getTotalAmount());
            Map<String, Object> data = getServiceName(ph);
            List<String> listService = (List<String>) data.get("listService");
            String petName = (String) data.get("petName");
            dto.setListService(listService);
            dto.setPetName(petName);
            paymentHistoryDTOList.add(dto);
        }

        return paymentHistoryDTOList;
    }

    private Map<String, Object> getServiceName(PaymentHistory paymentHistory){
        List<String> listService = new ArrayList<>();
        List<PaymentDetail> listDetail = paymentDetailRepository.findAllByPaymentHistory(paymentHistory);
        String petName = listDetail.getFirst().getAppointments().getPets().getPetName();
        for (PaymentDetail pd : listDetail) {
            String serviceName = pd.getAppointments().getServices().getServiceName();
            listService.add(serviceName);
        }
        Map<String , Object> map = new HashMap<>();
        map.put("listService", listService);
        map.put("petName", petName);

        return map;

    }
}
