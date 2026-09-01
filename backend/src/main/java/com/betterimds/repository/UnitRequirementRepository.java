package com.betterimds.repository;

import com.betterimds.entity.UnitRequirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRequirementRepository extends JpaRepository<UnitRequirement, Integer> {
}
