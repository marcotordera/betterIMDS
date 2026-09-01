package com.betterimds.repository;

import com.betterimds.entity.UnitOrg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitOrgRepository extends JpaRepository<UnitOrg, Integer> {

    @Query("SELECT u FROM UnitOrg u WHERE LOWER(u.squadron) = LOWER(:squadron)")
    List<UnitOrg> findBySquadron(String squadron);

    @Query("SELECT u FROM UnitOrg u WHERE u.squadron = :squadron AND u.flight = :flight AND u.shopCode = :shopCode")
    Optional<UnitOrg> findByShop(String squadron, String flight, String shopCode);
}
