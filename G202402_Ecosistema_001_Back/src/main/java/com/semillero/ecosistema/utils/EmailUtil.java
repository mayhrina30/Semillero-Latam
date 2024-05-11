package com.semillero.ecosistema.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Component
@RequiredArgsConstructor
public class EmailUtil {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final String TEMPLATE_NAME = "Email-template";
    private static final String NOREPLY_ADDRESS = "noreply@baeldung.com";

    public void sendHTMLEmail(String[] to, String subject, Context context) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, "UTF-8");

        String html = templateEngine.process(TEMPLATE_NAME, context);

        messageHelper.setFrom(NOREPLY_ADDRESS);
        messageHelper.setTo(to);
        messageHelper.setSubject(subject);
        messageHelper.setText(html, true);

        mailSender.send(message);
    }
}
