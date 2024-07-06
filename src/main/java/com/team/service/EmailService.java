package com.team.service;

import com.team.dto.MailBody;
import com.team.dto.RescheduleDTO;
import com.team.model.Appointments;
import com.team.model.PaymentDetail;
import com.team.model.PaymentHistory;
import com.team.repository.AppointmentRepository;
import com.team.repository.PaymentHistoryRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;


import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender javaMailSender;
    private final PaymentHistoryRepository paymentHistoryRepository;
    private final AppointmentRepository appointmentRepository;


    public EmailService(JavaMailSender javaMailSender, PaymentHistoryRepository paymentHistoryRepository, AppointmentRepository appointmentRepository) {
        this.javaMailSender = javaMailSender;
        this.paymentHistoryRepository = paymentHistoryRepository;
        this.appointmentRepository = appointmentRepository;
    }


    public void sendEmail(String email, String text, String subject) {
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text(text)
                .subject(subject)
                .build();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.to());
        message.setFrom("pawfection391@gmail.com");
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());

        javaMailSender.send(message);
    }

    public Map<String, String> sendEmailPayment(List<PaymentDetail> paymentDetails, String type) {
        MimeMessage message = javaMailSender.createMimeMessage();
        Map<String, String> response = new HashMap<>();
        int paymentID = paymentDetails.getFirst().getPaymentHistory().getPaymentHistoryID();
        PaymentHistory paymentHistory = paymentHistoryRepository.findById(paymentID)
                .orElseThrow(() -> new RuntimeException("Payment History not found"));
        String paymentTime = paymentHistory.getPaymentTime().toString();
        String total = String.format("%.2f", paymentHistory.getTotalAmount());
        try {
            // set mediaType
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            Context context = new Context();
            String customerName = paymentDetails.getFirst().getCustomers().getCustomerName();
            String customerEmail = paymentDetails.getFirst().getCustomers().getEmail();
            String petName = paymentDetails.getFirst().getAppointments().getPets().getPetName();
            context.setVariable("customerName", customerName);
            context.setVariable("customerEmail", customerEmail);
            context.setVariable("petName", petName);
            context.setVariable("total", total);
            context.setVariable("type", type);

            List<Map<String, Object>> listTable = new ArrayList<>();
            for (PaymentDetail pd : paymentDetails) {
                Map<String, Object> paymentInfo = new HashMap<>();
                String serviceName = pd.getAppointments().getServices().getServiceName();
                String appointmentTime = pd.getAppointments().getAppointmentTime().toString();
                double price = pd.getAppointments().getServices().getPrice();
                paymentInfo.put("price", price);
                paymentInfo.put("dateTime", convertDateTimeFormat(appointmentTime));
                paymentInfo.put("serviceName", serviceName);
                listTable.add(paymentInfo);
            }
            context.setVariable("listTable", listTable);
            context.setVariable("paymentDate", convertDateTimeFormat(paymentTime));

            // Process template
            ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
            templateResolver.setPrefix("templates/");
            templateResolver.setSuffix(".html");
            templateResolver.setTemplateMode(TemplateMode.HTML);

            TemplateEngine templateEngine = new TemplateEngine();
            templateEngine.setTemplateResolver(templateResolver);

            String html = templateEngine.process("index2", context);

            helper.setTo(customerEmail);
            helper.setText(html, true);
            helper.setSubject("Thank you for using our services");
            javaMailSender.send(message);

            response.put("message", "mail send to: " + customerEmail);
            response.put("status", "Successful");

        } catch (MessagingException  e) {
            response.put("message", "Mail Sending failure : " + e.getMessage());
            response.put("status", "Failed");
        }

        return response;
    }


    public void sendEmailReschedule(RescheduleDTO request){
        MimeMessage message = javaMailSender.createMimeMessage();
        Appointments appointments = appointmentRepository.findById(request.getAppointmentID().getFirst()).get();
        String customerName = appointments.getCustomer().getCustomerName();
        String email = appointments.getCustomer().getEmail();
        String petName = appointments.getPets().getPetName();
        try {
            // set mediaType
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            Context context = new Context();
            context.setVariable("customerName", customerName);
            context.setVariable("customerEmail", email);
            context.setVariable("petName", petName);
            context.setVariable("type", "Reschedule");
            double total = 0;

            List<Map<String, Object>> listTable = new ArrayList<>();
            for (Integer appointmentID : request.getAppointmentID()) {
                Map<String, Object> paymentInfo = new HashMap<>();
                Appointments appoint = appointmentRepository.findById(appointmentID).get();
                String serviceName = appoint.getServices().getServiceName();
                String appointmentTime = appoint.getAppointmentTime().toString();
                double price = appoint.getServices().getPrice();
                total += price;
                paymentInfo.put("price", price);
                paymentInfo.put("dateTime", convertDateTimeFormat(appointmentTime));
                paymentInfo.put("serviceName", serviceName);
                listTable.add(paymentInfo);
            }
            context.setVariable("listTable", listTable);
//            context.setVariable("paymentDate", convertDateTimeFormat(paymentTime));

            context.setVariable("total", String.format("%.2f", total));
            // Process template
            ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
            templateResolver.setPrefix("templates/");
            templateResolver.setSuffix(".html");
            templateResolver.setTemplateMode(TemplateMode.HTML);

            TemplateEngine templateEngine = new TemplateEngine();
            templateEngine.setTemplateResolver(templateResolver);

            String html = templateEngine.process("reschedule", context);

            helper.setTo(email);
            helper.setText(html, true);
            helper.setSubject("Thank you for using our services");
            javaMailSender.send(message);

        } catch (MessagingException  e) {
            log.error("Error at sendEmailSchedule: {}", e.getMessage());
        }
    }

    private String convertDateTimeFormat(String inputDateTime) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");

        try {
            LocalDateTime dateTime = LocalDateTime.parse(inputDateTime, inputFormatter);

            String formattedDateTime = dateTime.format(outputFormatter);

            return formattedDateTime;
        } catch (Exception e) {
            System.err.println("Error converting datetime: " + e.getMessage());
            return null;
        }
    }
    public void sendOtpEmail(String to, String otp, String companyName) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Context context = new Context();
        context.setVariable("otp", otp);
        context.setVariable("companyName", companyName);

        // Process template
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        String htmlContent = templateEngine.process("otp-email", context);
        helper.setTo(to);
        helper.setSubject("Your OTP Code");
        helper.setText(htmlContent, true);

        javaMailSender.send(message);
    }


}
