package com.betterimds.repository;

import com.betterimds.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Integer> {

    @Query("SELECT a FROM AdminUser a WHERE a.username = :username")
    Optional<AdminUser> findByUsername(String username);
}
