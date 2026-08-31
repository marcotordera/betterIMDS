package com.betterimds.repository;

import com.betterimds.entity.CompletionTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompletionTrackerRepository extends JpaRepository<CompletionTracker, Integer> {

    // Member completion history
    List<CompletionTracker> findByTraineeUid(Integer traineeUid);

    List<CompletionTracker> findByTraineeUidOrderByCompletedDateDesc(Integer traineeUid);

    // Filter completions for a specific member and course
    List<CompletionTracker> findByTraineeUidAndCourseCourseId(Integer traineeUid, Integer courseId);

    // Get the most recent completion for a specific trainee and course
    Optional<CompletionTracker> findTopByTraineeUidAndCourseCourseIdOrderByCompletedDateDesc(Integer traineeUid, Integer courseId);

    // Find all completions expiring on or before a target date (e.g. overdue check)
    List<CompletionTracker> findByExpirationDateLessThanEqual(LocalDate date);

    // Find all completions expiring within a window (e.g. due in next 30/60 days)
    List<CompletionTracker> findByExpirationDateBetween(LocalDate startDate, LocalDate endDate);

    // Find all sign-offs performed by a certifier
    List<CompletionTracker> findBySignedOffByUid(Integer signedOffByUid);

    // Custom query to fetch the latest completion records for all courses of a trainee
    @Query("SELECT c FROM CompletionTracker c WHERE c.trainee.uid = :traineeUid AND c.completedDate = " +
           "(SELECT MAX(c2.completedDate) FROM CompletionTracker c2 WHERE c2.trainee.uid = :traineeUid AND c2.course.courseId = c.course.courseId)")
    List<CompletionTracker> findLatestCompletionsForTrainee(@Param("traineeUid") Integer traineeUid);
}
