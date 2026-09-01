package com.betterimds.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class CompletionTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer logId;

    @ManyToOne
    @JoinColumn(name = "trainee_uid")
    private Personnel trainee;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseMetadata course;

    private LocalDate completedDate;
    private LocalDate expirationDate;

    @ManyToOne
    @JoinColumn(name = "signed_off_by_uid")
    private Personnel signedOffBy;

    private LocalDateTime createdAt;

    public CompletionTracker() {
    }

    public CompletionTracker(Personnel trainee, CourseMetadata course, LocalDate completedDate, LocalDate expirationDate, Personnel signedOffBy) {
        this.trainee = trainee;
        this.course = course;
        this.completedDate = completedDate;
        this.expirationDate = expirationDate;
        this.signedOffBy = signedOffBy;
    }

    public Integer getLogId() {
        return logId;
    }

    public void setLogId(Integer logId) {
        this.logId = logId;
    }

    public Personnel getTrainee() {
        return trainee;
    }

    public void setTrainee(Personnel trainee) {
        this.trainee = trainee;
    }

    public CourseMetadata getCourse() {
        return course;
    }

    public void setCourse(CourseMetadata course) {
        this.course = course;
    }

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDate completedDate) {
        this.completedDate = completedDate;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Personnel getSignedOffBy() {
        return signedOffBy;
    }

    public void setSignedOffBy(Personnel signedOffBy) {
        this.signedOffBy = signedOffBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
