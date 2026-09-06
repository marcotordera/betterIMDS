package com.betterimds.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

public class DashboardDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AirmanDto {
        private Integer uid;
        private String edipi;
        private String firstName;
        private String lastName;
        private String rank;
        private String email;
        private Integer squadronId;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseDto {
        private Integer courseId;
        private String courseCode;
        private String courseTitle;
        private Integer frequencyMonths;
        private Integer gracePeriodDays;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatusDetailDto {
        private String status; // VALID, EXPIRING, OVERDUE, WAIVER
        private String completedDate;
        private String expirationDate;
        private String reason;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AirmanMatrixRowDto {
        private AirmanDto airman;
        private Map<String, StatusDetailDto> courses;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DashboardMetricsDto {
        private Double readinessPercentage;
        private Integer totalAirmen;
        private Integer overdueCount;
        private Integer expiringCount;
        private Integer waiverCount;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DashboardMatrixResponse {
        private Integer squadronId;
        private String squadronName;
        private DashboardMetricsDto metrics;
        private List<AirmanMatrixRowDto> roster;
        private List<CourseDto> courses;
    }
}
