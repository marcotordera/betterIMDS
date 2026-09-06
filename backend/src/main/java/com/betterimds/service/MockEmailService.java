package com.betterimds.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Primary
@Slf4j
public class MockEmailService implements EmailService {

    @Override
    public void sendTrainingReminder(String recipientEmail, String airmanName, List<String> overdueCourses, String customMessage) {
        log.info("================================================================================");
        log.info("📧 [MOCK EMAIL DISPATCHED via SMTP Local Strategy]");
        log.info("To: {}", recipientEmail);
        log.info("Airman: {}", airmanName);
        log.info("Subject: [ACTION REQUIRED] Air Force CBT Training Notification - BetterIMDS");
        log.info("Overdue/Expiring Requirements: {}", String.join(", ", overdueCourses));
        if (customMessage != null && !customMessage.isBlank()) {
            log.info("Custom UTM Message: {}", customMessage);
        }
        log.info("================================================================================");
    }
}
