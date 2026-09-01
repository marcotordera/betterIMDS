package com.betterimds.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Personnel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;
    private String edipi;
    private String firstName;
    private String lastName;
    private String rank;
    private String email;

    @ManyToOne
    @JoinColumn(name = "org_id")
    private UnitOrg unitOrg;

    private Boolean isActive = true;

    @Column(insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Personnel() {
    }

    public Personnel(String edipi, String firstName, String lastName, String rank, String email, UnitOrg unitOrg) {
        this.edipi = edipi;
        this.firstName = firstName;
        this.lastName = lastName;
        this.rank = rank;
        this.email = email;
        this.unitOrg = unitOrg;
        this.isActive = true;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getEdipi() {
        return edipi;
    }

    public void setEdipi(String edipi) {
        this.edipi = edipi;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UnitOrg getUnitOrg() {
        return unitOrg;
    }

    public void setUnitOrg(UnitOrg unitOrg) {
        this.unitOrg = unitOrg;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
