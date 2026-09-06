package com.betterimds.repository;

import com.betterimds.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Integer> {
    Optional<AdminUser> findByEmailAndIsActiveTrue(String email);
    Optional<AdminUser> findByUsernameAndIsActiveTrue(String username);
}
