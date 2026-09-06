package com.betterimds.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class RequestDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AddAirmanRequest {
        private String rank;
        private String firstName;
        private String lastName;
        private String edipi;
        private String email;
        private Integer squadronId;
        private String initialStatus; // OVERDUE, EXPIRING, VALID
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LogCompletionRequest {
        private Integer airmanId;
        private String courseCode;
        private String completedDate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GrantExemptionRequest {
        private Integer airmanId;
        private String courseCode;
        private String reason;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InvalidateCompletionRequest {
        private Integer airmanId;
        private String courseCode;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BulkActionRequest {
        private List<Integer> airmanIds;
        private List<String> courseCodes;
        private String actionType; // VALID, WAIVER, OVERDUE
        private String completedDate;
        private String reason;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BulkDeleteRequest {
        private List<Integer> airmanIds;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginResponse {
        private Integer adminId;
        private String email;
        private String fullName;
        private String role; // SQUADRON_UTM, WING_UTM
        private String defaultSquadron;
        private List<String> accessibleSquadrons;
        private String token;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmailNotificationRequest {
        private List<Integer> airmanIds;
        private String subject;
        private String customMessage;
        private Boolean ccSupervisors;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmailNotificationResponse {
        private Boolean success;
        private Integer recipientCount;
        private String message;
    }
}
