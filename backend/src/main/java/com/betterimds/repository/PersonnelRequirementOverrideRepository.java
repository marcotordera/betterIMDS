package com.betterimds.repository;

import com.betterimds.entity.PersonnelRequirementOverride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonnelRequirementOverrideRepository extends JpaRepository<PersonnelRequirementOverride, Integer> {
    List<PersonnelRequirementOverride> findByTrainee_Uid(Integer traineeUid);
    Optional<PersonnelRequirementOverride> findByTrainee_UidAndCourse_CourseCode(Integer traineeUid, String courseCode);
    List<PersonnelRequirementOverride> findByTrainee_Squadron_SquadronId(Integer squadronId);
    void deleteByTrainee_UidAndCourse_CourseCode(Integer traineeUid, String courseCode);
}
