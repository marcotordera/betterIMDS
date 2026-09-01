package com.betterimds.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class PersonnelRequirementOverride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer overrideId;

    @ManyToOne
    @JoinColumn(name = "trainee_uid")
    private Personnel trainee;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseMetadata course;

    private String overrideType;
    private String reason;

    @Column(insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public PersonnelRequirementOverride() {
    }

    public PersonnelRequirementOverride(Personnel trainee, CourseMetadata course, String overrideType, String reason) {
        this.trainee = trainee;
        this.course = course;
        this.overrideType = overrideType;
        this.reason = reason;
    }

    public Integer getOverrideId() {
        return overrideId;
    }

    public void setOverrideId(Integer overrideId) {
        this.overrideId = overrideId;
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

    public String getOverrideType() {
        return overrideType;
    }

    public void setOverrideType(String overrideType) {
        this.overrideType = overrideType;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
