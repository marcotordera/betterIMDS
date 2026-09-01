package com.betterimds.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class AdminUnitScope {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scopeId;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private AdminUser adminUser;

    @ManyToOne
    @JoinColumn(name = "org_id")
    private UnitOrg unitOrg;

    @Column(insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public AdminUnitScope() {
    }

    public AdminUnitScope(AdminUser adminUser, UnitOrg unitOrg) {
        this.adminUser = adminUser;
        this.unitOrg = unitOrg;
    }

    public Integer getScopeId() {
        return scopeId;
    }

    public void setScopeId(Integer scopeId) {
        this.scopeId = scopeId;
    }

    public AdminUser getAdminUser() {
        return adminUser;
    }

    public void setAdminUser(AdminUser adminUser) {
        this.adminUser = adminUser;
    }

    public UnitOrg getUnitOrg() {
        return unitOrg;
    }

    public void setUnitOrg(UnitOrg unitOrg) {
        this.unitOrg = unitOrg;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
