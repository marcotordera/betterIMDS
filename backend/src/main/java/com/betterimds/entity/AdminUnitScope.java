package com.betterimds.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    private LocalDateTime createdAt;
}
