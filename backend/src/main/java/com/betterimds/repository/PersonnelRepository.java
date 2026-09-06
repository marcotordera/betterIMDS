package com.betterimds.repository;

import com.betterimds.entity.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Integer> {
    List<Personnel> findBySquadron_SquadronIdAndIsActiveTrue(Integer squadronId);
    List<Personnel> findBySquadron_SquadronNameAndIsActiveTrue(String squadronName);
    Optional<Personnel> findByEdipi(String edipi);
}
