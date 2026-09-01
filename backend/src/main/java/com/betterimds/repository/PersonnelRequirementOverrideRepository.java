package com.betterimds.repository;

import com.betterimds.entity.PersonnelRequirementOverride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonnelRequirementOverrideRepository extends JpaRepository<PersonnelRequirementOverride, Integer> {
}
