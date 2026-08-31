package com.betterimds.repository;

import com.betterimds.entity.UnitRequirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitRequirementRepository extends JpaRepository<UnitRequirement, Integer> {

    // Find all required courses for a given unit/shop
    List<UnitRequirement> findByUnitOrgOrgId(Integer orgId);

    // Find all units requiring a specific course
    List<UnitRequirement> findByCourseCourseId(Integer courseId);

    // Find a specific junction record
    Optional<UnitRequirement> findByUnitOrgOrgIdAndCourseCourseId(Integer orgId, Integer courseId);

    boolean existsByUnitOrgOrgIdAndCourseCourseId(Integer orgId, Integer courseId);

    void deleteByUnitOrgOrgIdAndCourseCourseId(Integer orgId, Integer courseId);
}
