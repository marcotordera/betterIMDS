package com.betterimds.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(
    name = "personnel_requirements_override",
    schema = "public",
    uniqueConstraints = {
        @UniqueConstraint(name = "unique_person_course_override", columnNames = {"trainee_uid", "course_id"})
    }
)
public class PersonnelRequirementOverride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "override_id")
    private Integer overrideId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "trainee_uid", nullable = false)
    private Personnel trainee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private CourseMetadata course;

    @Column(name = "override_type", nullable = false, length = 20)
    private String overrideType; // e.g. "EXEMPT", "WAIVER", "SUBSTITUTION"

    @Column(name = "reason", nullable = false, columnDefinition = "TEXT")
    private String reason;

    @Column(name = "created_at", insertable = false, updatable = false)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PersonnelRequirementOverride that = (PersonnelRequirementOverride) o;
        return Objects.equals(overrideId, that.overrideId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(overrideId);
    }
}
