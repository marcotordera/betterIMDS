package com.betterimds.repository;

import com.betterimds.entity.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Integer> {

    // Unique EDIPI lookup
    Optional<Personnel> findByEdipi(String edipi);

    boolean existsByEdipi(String edipi);

    // Active roster queries
    List<Personnel> findByIsActiveTrue();

    List<Personnel> findByUnitOrgOrgId(Integer orgId);

    List<Personnel> findByUnitOrgOrgIdAndIsActiveTrue(Integer orgId);

    // Search by name
    List<Personnel> findByLastNameContainingIgnoreCaseOrFirstNameContainingIgnoreCase(String lastName, String firstName);

    // Search by rank
    List<Personnel> findByRank(String rank);
}
