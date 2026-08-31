package com.betterimds.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "personnel", schema = "public")
public class Personnel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid")
    private Integer uid;

    @Column(name = "edipi", nullable = false, unique = true, length = 10)
    private String edipi;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "rank", nullable = false, length = 10)
    private String rank;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "org_id")
    private UnitOrg unitOrg;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Personnel() {
    }

    public Personnel(String edipi, String firstName, String lastName, String rank, UnitOrg unitOrg) {
        this.edipi = edipi;
        this.firstName = firstName;
        this.lastName = lastName;
        this.rank = rank;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Personnel personnel = (Personnel) o;
        return Objects.equals(uid, personnel.uid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uid);
    }
}
