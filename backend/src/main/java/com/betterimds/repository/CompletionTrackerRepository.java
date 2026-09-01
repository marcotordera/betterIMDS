package com.betterimds.repository;

import com.betterimds.entity.CompletionTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CompletionTrackerRepository extends JpaRepository<CompletionTracker, Integer> {

    @Query("SELECT c FROM CompletionTracker c WHERE c.trainee.uid = :uid ORDER BY c.completedDate DESC")
    List<CompletionTracker> findByTraineeUid(Integer uid);

    @Query("SELECT c FROM CompletionTracker c WHERE c.expirationDate <= :targetDate ORDER BY c.expirationDate ASC")
    List<CompletionTracker> findExpiringBefore(LocalDate targetDate);
}
