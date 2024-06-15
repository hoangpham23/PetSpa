package com.team.service;

import com.team.config.VNPayConfig;
import com.team.model.Appointments;
import com.team.model.Customers;
import com.team.model.PaymentHistory;
import com.team.repository.AppointmentRepository;
import com.team.repository.CustomerRepository;
import com.team.repository.PaymentHistoryRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

@Service
public class PaymentService {

    private final static DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private final VNPayConfig VNPayConfig;
    private final AppointmentRepository appointmentRepository;
    private final CustomerRepository customerRepository;
    private final PaymentHistoryRepository paymentHistoryRepository;

    public PaymentService(VNPayConfig VNPayConfig, AppointmentRepository appointmentRepository, CustomerRepository customerRepository, PaymentHistoryRepository paymentHistoryRepository) {
        this.VNPayConfig = VNPayConfig;
        this.appointmentRepository = appointmentRepository;
        this.customerRepository = customerRepository;
        this.paymentHistoryRepository = paymentHistoryRepository;
    }

    public String paymentURL(Map<String, String> data, HttpServletRequest req) throws UnsupportedEncodingException {

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
//        long amount = Integer.parseInt(req.getParameter("totalAmount")) * 100L;
        long amount = Long.parseLong(data.get("amount"));
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = VNPayConfig.getIpAddress(req);
        String vnp_TmnCode = VNPayConfig.getVnp_TmnCode();

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
//            vnp_Params.put("vnp_BankCode", "NCB");
        // khi ko truyen tham so bank code se chuyen trang lua chon hinh thuc thanh toan

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = req.getParameter("language");
        if (locate != null && !locate.isEmpty()) {
            vnp_Params.put("vnp_Locale", locate);
        } else {
            vnp_Params.put("vnp_Locale", "vn");
        }
//        vnp_Params.put("vnp_Locale", "vn");
//        vnp_Params.put("vnp_Locale", "en"); // thiet lap ngon ngu
//        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.getVnp_ReturnUrl() + "?customerID=" + req.getParameter("customerID"));
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.getVnp_ReturnUrl() + "?customerID=" + data.get("customerID"));
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15); // thời gian cho phép khách hàng thực hiện thanh toán
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.getSecretKey(), hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.getVnp_PayUrl() + "?" + queryUrl;


        return paymentUrl;
    }


    public String paymentURL(HttpServletRequest req) throws UnsupportedEncodingException {

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = Integer.parseInt(req.getParameter("amount")) * 100L;
//        long amount = Long.parseLong(data.get("amount"));
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = VNPayConfig.getIpAddress(req);
        String vnp_TmnCode = VNPayConfig.getVnp_TmnCode();

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
//            vnp_Params.put("vnp_BankCode", "NCB");
        // khi ko truyen tham so bank code se chuyen trang lua chon hinh thuc thanh toan

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = req.getParameter("language");
        if (locate != null && !locate.isEmpty()) {
            vnp_Params.put("vnp_Locale", locate);
        } else {
            vnp_Params.put("vnp_Locale", "vn");
        }

        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.getVnp_ReturnUrl() + "?customerID=" + req.getParameter("customerID"));
//        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.getVnp_ReturnUrl() + "?customerID=" + data.get("customerID"));
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15); // thời gian cho phép khách hàng thực hiện thanh toán
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.getSecretKey(), hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.getVnp_PayUrl() + "?" + queryUrl;


        return paymentUrl;
    }

    public boolean changePaymentStatus(int customerID, String paymentStatus){
        List<Appointments> list = appointmentRepository.SQL_findCustomerIDAndPaymentStatus(customerID, "Pending");
        int count = 0; // check that with customerId change all the paymentStatus into Paid
        for (Appointments appointments : list){
            if (("Pending").equalsIgnoreCase(appointments.getPaymentStatus())){
                appointments.setPaymentStatus(paymentStatus);
                appointmentRepository.save(appointments);
                count++;
            }
            if (count == list.size()){
                return true;
            }
        }
        return false;
    }

    public void savePaymentHistory(int customerID, double totalAmount, String paymentMethod){
        Customers customers = customerRepository.findById(customerID).get();
        String paymentTime = LocalDateTime.now().format(FORMATTER);
        PaymentHistory paymentHistory = new PaymentHistory();
        paymentHistory.setCustomers(customers);
        paymentHistory.setTotalAmount(totalAmount);
        paymentHistory.setPaymentMethod(paymentMethod);
        paymentHistory.setPaymentTime(Timestamp.valueOf(paymentTime));
        paymentHistoryRepository.save(paymentHistory);
    }

    private String parseAndFormatDateTime(String input) {
        // Define the input and output date formats
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        try {
            // Parse the input string to a LocalDateTime object
            LocalDateTime dateTime = LocalDateTime.parse(input, inputFormatter);

            // Format the LocalDateTime object to the desired output format
            return dateTime.format(outputFormatter);
        } catch (DateTimeParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
