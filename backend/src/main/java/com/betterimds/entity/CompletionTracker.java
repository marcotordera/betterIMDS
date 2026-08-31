package com.betterimds.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "completion_tracker", schema = "public")
public class CompletionTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Integer logId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "trainee_uid", nullable = false)
    private Personnel trainee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private CourseMetadata course;

    @Column(name = "completed_date", nullable = false)
    private LocalDate completedDate;

    @Column(name = "expiration_date", nullable = false)
    private LocalDate expirationDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "signed_off_by_uid")
    private Personnel signedOffBy;

    @Column(name = "created_at", insertable = false, updatable = false)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CompletionTracker that = (CompletionTracker) o;
        return Objects.equals(logId, that.logId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(logId);
    }
}
