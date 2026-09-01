package com.betterimds.repository;

import com.betterimds.entity.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Integer> {

    @Query("SELECT p FROM Personnel p WHERE LOWER(p.unitOrg.squadron) = LOWER(:squadron)")
    List<Personnel> findBySquadron(@Param("squadron") String squadron);

    @Query("SELECT p FROM Personnel p WHERE p.edipi = :edipi")
    Optional<Personnel> findByEdipi(@Param("edipi") String edipi);

    @Query("SELECT p FROM Personnel p WHERE p.isActive = true")
    List<Personnel> findActive();

    @Query("SELECT p FROM Personnel p WHERE p.unitOrg.orgId = :orgId")
    List<Personnel> findByOrgId(@Param("orgId") Integer orgId);
}
