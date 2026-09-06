package com.betterimds.service;

import com.betterimds.context.DataStore;
import com.betterimds.dto.RequestDtos.*;
import com.betterimds.entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class TrainingService {

    private final DataStore db;

    public TrainingService(DataStore db) {
        this.db = db;
    }

    public boolean logCompletion(LogCompletionRequest request) {
        if (request.getAirmanId() == null || request.getCourseCode() == null) {
            return false;
        }
        int airmanId = request.getAirmanId();
        Optional<Personnel> personOpt = db.getPersonnel().findById(airmanId);
        Optional<CourseMetadata> courseOpt = db.getCourses().findByCourseCode(request.getCourseCode());

        if (personOpt.isEmpty() || courseOpt.isEmpty()) {
            return false;
        }

        Personnel person = personOpt.get();
        CourseMetadata course = courseOpt.get();

        // Clear previous overrides or completions for this requirement
        db.getOverrides().deleteByTrainee_UidAndCourse_CourseCode(person.getUid(), course.getCourseCode());
        db.getCompletions().deleteByTrainee_UidAndCourse_CourseCode(person.getUid(), course.getCourseCode());

        LocalDate completed = (request.getCompletedDate() != null && !request.getCompletedDate().isBlank())
                ? LocalDate.parse(request.getCompletedDate())
                : LocalDate.now();

        LocalDate expiration = completed.plusMonths(course.getFrequencyMonths() != null ? course.getFrequencyMonths() : 12);

        CompletionTracker tracker = new CompletionTracker();
        tracker.setTrainee(person);
        tracker.setCourse(course);
        tracker.setCompletedDate(completed);
        tracker.setExpirationDate(expiration);
        tracker.setCreatedAt(LocalDateTime.now());

        db.getCompletions().save(tracker);
        return true;
    }

    public boolean grantExemption(GrantExemptionRequest request) {
        if (request.getAirmanId() == null || request.getCourseCode() == null) {
            return false;
        }
        int airmanId = request.getAirmanId();
        Optional<Personnel> personOpt = db.getPersonnel().findById(airmanId);
        Optional<CourseMetadata> courseOpt = db.getCourses().findByCourseCode(request.getCourseCode());

        if (personOpt.isEmpty() || courseOpt.isEmpty()) {
            return false;
        }

        Personnel person = personOpt.get();
        CourseMetadata course = courseOpt.get();

        // Clear previous overrides or completions for this requirement
        db.getCompletions().deleteByTrainee_UidAndCourse_CourseCode(person.getUid(), course.getCourseCode());
        db.getOverrides().deleteByTrainee_UidAndCourse_CourseCode(person.getUid(), course.getCourseCode());

        PersonnelRequirementOverride override = new PersonnelRequirementOverride();
        override.setTrainee(person);
        override.setCourse(course);
        override.setOverrideType("WAIVER");
        override.setReason(request.getReason() != null && !request.getReason().isBlank()
                ? request.getReason().trim()
                : "Approved Exemption / Waiver");
        override.setCreatedAt(LocalDateTime.now());

        db.getOverrides().save(override);
        return true;
    }

    public boolean invalidateCompletion(InvalidateCompletionRequest request) {
        if (request.getAirmanId() == null || request.getCourseCode() == null) {
            return false;
        }
        int airmanId = request.getAirmanId();
        Optional<Personnel> personOpt = db.getPersonnel().findById(airmanId);
        Optional<CourseMetadata> courseOpt = db.getCourses().findByCourseCode(request.getCourseCode());

        if (personOpt.isEmpty() || courseOpt.isEmpty()) {
            return false;
        }

        Personnel person = personOpt.get();
        CourseMetadata course = courseOpt.get();

        db.getCompletions().deleteByTrainee_UidAndCourse_CourseCode(person.getUid(), course.getCourseCode());
        db.getOverrides().deleteByTrainee_UidAndCourse_CourseCode(person.getUid(), course.getCourseCode());
        return true;
    }

    public int applyBulkAction(BulkActionRequest request) {
        int count = 0;
        if (request.getAirmanIds() == null || request.getCourseCodes() == null) {
            return 0;
        }

        for (Integer airmanId : request.getAirmanIds()) {
            for (String courseCode : request.getCourseCodes()) {
                if ("VALID".equalsIgnoreCase(request.getActionType())) {
                    logCompletion(new LogCompletionRequest(airmanId, courseCode, request.getCompletedDate()));
                    count++;
                } else if ("WAIVER".equalsIgnoreCase(request.getActionType())) {
                    grantExemption(new GrantExemptionRequest(airmanId, courseCode, request.getReason()));
                    count++;
                } else if ("OVERDUE".equalsIgnoreCase(request.getActionType())) {
                    invalidateCompletion(new InvalidateCompletionRequest(airmanId, courseCode));
                    count++;
                }
            }
        }
        return count;
    }
}
