package com.betterimds.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
