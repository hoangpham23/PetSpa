package com.team.service;

import com.team.dto.MailBody;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;


    public EmailService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void sendSimpleMessage(MailBody mailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.to());
        message.setFrom("pawfection391@gmail.com");
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());

        javaMailSender.send(message);
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
}
