package com.betterimds.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class UnitRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requirementId;

    @ManyToOne
    @JoinColumn(name = "org_id")
    private UnitOrg unitOrg;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseMetadata course;

    @Column(insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public UnitRequirement() {
    }

    public UnitRequirement(UnitOrg unitOrg, CourseMetadata course) {
        this.unitOrg = unitOrg;
        this.course = course;
    }

    public Integer getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(Integer requirementId) {
        this.requirementId = requirementId;
    }

    public UnitOrg getUnitOrg() {
        return unitOrg;
    }

    public void setUnitOrg(UnitOrg unitOrg) {
        this.unitOrg = unitOrg;
    }

    public CourseMetadata getCourse() {
        return course;
    }

    public void setCourse(CourseMetadata course) {
        this.course = course;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
