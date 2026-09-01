package com.betterimds.repository;

import com.betterimds.entity.AdminUnitScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminUnitScopeRepository extends JpaRepository<AdminUnitScope, Integer> {

    @Query("SELECT s FROM AdminUnitScope s WHERE s.adminUser.adminId = :adminId")
    List<AdminUnitScope> findByAdminId(@Param("adminId") Integer adminId);
}
