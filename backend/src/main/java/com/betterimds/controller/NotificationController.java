package com.betterimds.controller;

import com.betterimds.context.DataStore;
import com.betterimds.dto.RequestDtos.EmailNotificationRequest;
import com.betterimds.dto.RequestDtos.EmailNotificationResponse;
import com.betterimds.entity.CompletionTracker;
import com.betterimds.entity.CourseMetadata;
import com.betterimds.entity.Personnel;
import com.betterimds.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/notifications")
@Tag(name = "Notifications", description = "Training Email Notification & Dispatch Endpoints")
public class NotificationController {

    private final DataStore db;
    private final EmailService emailService;

    public NotificationController(DataStore db, EmailService emailService) {
        this.db = db;
        this.emailService = emailService;
    }

    @PostMapping("/email")
    @Operation(summary = "Send email training reminders to selected Airmen")
    public ResponseEntity<EmailNotificationResponse> sendEmailNotifications(@RequestBody EmailNotificationRequest request) {
        if (request.getAirmanIds() == null || request.getAirmanIds().isEmpty()) {
            return ResponseEntity.badRequest().body(new EmailNotificationResponse(false, 0, "No Airmen selected"));
        }

        int count = 0;
        List<CourseMetadata> allCourses = db.getCourses().findAll();
        LocalDate today = LocalDate.now();

        for (Integer uid : request.getAirmanIds()) {
            if (uid == null) continue;
            Optional<Personnel> personOpt = db.getPersonnel().findById(uid);
            if (personOpt.isPresent()) {
                Personnel person = personOpt.get();
                List<CompletionTracker> completions = db.getCompletions().findByTrainee_Uid(person.getUid());

                List<String> overdueOrExpiring = new ArrayList<>();
                for (CourseMetadata course : allCourses) {
                    boolean hasValid = completions.stream().anyMatch(c ->
                            c.getCourse().getCourseCode().equals(course.getCourseCode()) &&
                            c.getExpirationDate() != null &&
                            c.getExpirationDate().isAfter(today.plusDays(30))
                    );
                    if (!hasValid) {
                        overdueOrExpiring.add(course.getCourseCode() + " (" + course.getCourseTitle() + ")");
                    }
                }

                String airmanFullName = person.getRank() + " " + person.getLastName() + ", " + person.getFirstName();
                emailService.sendTrainingReminder(person.getEmail(), airmanFullName, overdueOrExpiring, request.getCustomMessage());
                count++;
            }
        }

        return ResponseEntity.ok(EmailNotificationResponse.builder()
                .success(true)
                .recipientCount(count)
                .message("Successfully dispatched training reminders to " + count + " Airmen")
                .build());
    }
}
