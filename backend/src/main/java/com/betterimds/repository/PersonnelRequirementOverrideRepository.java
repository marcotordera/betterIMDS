package com.betterimds.repository;

import com.betterimds.entity.PersonnelRequirementOverride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonnelRequirementOverrideRepository extends JpaRepository<PersonnelRequirementOverride, Integer> {

    @Query("SELECT o FROM PersonnelRequirementOverride o WHERE o.trainee.uid = :uid")
    List<PersonnelRequirementOverride> findByTraineeUid(Integer uid);
}
