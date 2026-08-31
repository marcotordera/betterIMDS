package com.betterimds.entity;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(
    name = "unit_org",
    schema = "public",
    uniqueConstraints = {
        @UniqueConstraint(name = "unique_shop", columnNames = {"squadron", "flight", "shop_code"})
    }
)
public class UnitOrg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "org_id")
    private Integer orgId;

    @Column(name = "squadron", nullable = false, length = 100)
    private String squadron;

    @Column(name = "flight", nullable = false, length = 50)
    private String flight;

    @Column(name = "shop_code", nullable = false, length = 10)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UnitOrg unitOrg = (UnitOrg) o;
        return Objects.equals(orgId, unitOrg.orgId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orgId);
    }
}
