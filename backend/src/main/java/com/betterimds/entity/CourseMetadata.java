package com.betterimds.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "course_metadata", schema = "public")
public class CourseMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer courseId;

    @Column(name = "course_code", nullable = false, unique = true, length = 20)
    private String courseCode;

    @Column(name = "course_title", nullable = false, length = 150)
    private String courseTitle;

    @Column(name = "frequency_months", nullable = false)
    private Integer frequencyMonths;

    @Column(name = "grace_period_days")
    private Integer gracePeriodDays = 30;

    public CourseMetadata() {
    }

    public CourseMetadata(String courseCode, String courseTitle, Integer frequencyMonths, Integer gracePeriodDays) {
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.frequencyMonths = frequencyMonths;
        this.gracePeriodDays = gracePeriodDays != null ? gracePeriodDays : 30;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public Integer getFrequencyMonths() {
        return frequencyMonths;
    }

    public void setFrequencyMonths(Integer frequencyMonths) {
        this.frequencyMonths = frequencyMonths;
    }

    public Integer getGracePeriodDays() {
        return gracePeriodDays;
    }

    public void setGracePeriodDays(Integer gracePeriodDays) {
        this.gracePeriodDays = gracePeriodDays;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CourseMetadata that = (CourseMetadata) o;
        return Objects.equals(courseId, that.courseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(courseId);
    }
}
