package com.betterimds.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CourseMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courseId;
    private String courseCode;
    private String courseTitle;
    private Integer frequencyMonths;
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
}
