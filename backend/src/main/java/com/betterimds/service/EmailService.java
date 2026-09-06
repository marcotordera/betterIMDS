package com.betterimds.service;

import java.util.List;

public interface EmailService {
    void sendTrainingReminder(String recipientEmail, String airmanName, List<String> overdueCourses, String customMessage);
}
