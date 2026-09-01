package com.betterimds.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UnitOrg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orgId;
    private String squadron;
    private String flight;
    private String shopCode;

    public UnitOrg() {
    }

    public UnitOrg(String squadron, String flight, String shopCode) {
        this.squadron = squadron;
        this.flight = flight;
        this.shopCode = shopCode;
    }

    public Integer getOrgId() {
        return orgId;
    }

    public void setOrgId(Integer orgId) {
        this.orgId = orgId;
    }

    public String getSquadron() {
        return squadron;
    }

    public void setSquadron(String squadron) {
        this.squadron = squadron;
    }

    public String getFlight() {
        return flight;
    }

    public void setFlight(String flight) {
        this.flight = flight;
    }

    public String getShopCode() {
        return shopCode;
    }

    public void setShopCode(String shopCode) {
        this.shopCode = shopCode;
    }
}
