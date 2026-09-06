package com.betterimds.repository;

import com.betterimds.entity.CompletionTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompletionTrackerRepository extends JpaRepository<CompletionTracker, Integer> {
    List<CompletionTracker> findByTrainee_Uid(Integer traineeUid);
    Optional<CompletionTracker> findTopByTrainee_UidAndCourse_CourseCodeOrderByCompletedDateDesc(Integer traineeUid, String courseCode);
    List<CompletionTracker> findByTrainee_Squadron_SquadronId(Integer squadronId);
    void deleteByTrainee_UidAndCourse_CourseCode(Integer traineeUid, String courseCode);
}
