package com.betterimds.repository;

import com.betterimds.entity.UnitRequirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnitRequirementRepository extends JpaRepository<UnitRequirement, Integer> {

    @Query("SELECT r FROM UnitRequirement r WHERE r.unitOrg.orgId = :orgId")
    List<UnitRequirement> findByOrgId(Integer orgId);

    @Query("SELECT r FROM UnitRequirement r WHERE r.course.courseId = :courseId")
    List<UnitRequirement> findByCourseId(Integer courseId);
}
