package com.betterimds.repository;

import com.betterimds.entity.UnitOrg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitOrgRepository extends JpaRepository<UnitOrg, Integer> {

    // Unique shop lookup
    Optional<UnitOrg> findBySquadronAndFlightAndShopCode(String squadron, String flight, String shopCode);

    // Filter by hierarchy
    List<UnitOrg> findBySquadron(String squadron);
    List<UnitOrg> findBySquadronAndFlight(String squadron, String flight);
    List<UnitOrg> findByShopCode(String shopCode);

    boolean existsBySquadronAndFlightAndShopCode(String squadron, String flight, String shopCode);
}
