package com.betterimds.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(
    name = "unit_requirements",
    schema = "public",
    uniqueConstraints = {
        @UniqueConstraint(name = "unique_unit_course", columnNames = {"org_id", "course_id"})
    }
)
public class UnitRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requirement_id")
    private Integer requirementId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "org_id", nullable = false)
    private UnitOrg unitOrg;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private CourseMetadata course;

    @Column(name = "created_at", insertable = false, updatable = false)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UnitRequirement that = (UnitRequirement) o;
        return Objects.equals(requirementId, that.requirementId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(requirementId);
    }
}
