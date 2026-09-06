package com.betterimds.repository;

import com.betterimds.entity.AdminUnitScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminUnitScopeRepository extends JpaRepository<AdminUnitScope, Integer> {
    List<AdminUnitScope> findByAdminUser_AdminId(Integer adminId);
}
