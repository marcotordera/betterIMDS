package com.betterimds.repository;

import com.betterimds.entity.PersonnelRequirementOverride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonnelRequirementOverrideRepository extends JpaRepository<PersonnelRequirementOverride, Integer> {

    // Find all overrides for a trainee
    List<PersonnelRequirementOverride> findByTraineeUid(Integer traineeUid);

    // Find specific course override for a trainee
    Optional<PersonnelRequirementOverride> findByTraineeUidAndCourseCourseId(Integer traineeUid, Integer courseId);

    // Filter by override type (e.g., EXEMPT, WAIVER)
    List<PersonnelRequirementOverride> findByOverrideType(String overrideType);

    boolean existsByTraineeUidAndCourseCourseId(Integer traineeUid, Integer courseId);

    void deleteByTraineeUidAndCourseCourseId(Integer traineeUid, Integer courseId);
}
