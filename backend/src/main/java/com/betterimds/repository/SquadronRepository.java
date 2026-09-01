package com.betterimds.repository;

import com.betterimds.entity.Squadron;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SquadronRepository extends JpaRepository<Squadron, Integer> {
}
