package com.betterimds.repository;

import com.betterimds.entity.AdminUnitScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminUnitScopeRepository extends JpaRepository<AdminUnitScope, Integer> {
}
