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
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private LocalDateTime createdAt;
}
