package com.betterimds.service;

import com.betterimds.context.DataStore;
import com.betterimds.dto.RequestDtos.LoginRequest;
import com.betterimds.dto.RequestDtos.LoginResponse;
import com.betterimds.entity.AdminUnitScope;
import com.betterimds.entity.AdminUser;
import com.betterimds.entity.Squadron;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    private final DataStore db;

    public AuthService(DataStore db) {
        this.db = db;
    }

    public Optional<LoginResponse> authenticate(LoginRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return Optional.empty();
        }

        Optional<AdminUser> adminOpt = db.getAdmins().findByEmailAndIsActiveTrue(request.getEmail().trim());
        if (adminOpt.isEmpty()) {
            adminOpt = db.getAdmins().findByUsernameAndIsActiveTrue(request.getEmail().trim());
        }

        if (adminOpt.isEmpty()) {
            return Optional.empty();
        }

        AdminUser admin = adminOpt.get();

        // Resolve accessible squadrons
        List<AdminUnitScope> scopes = db.getScopes().findByAdminUser_AdminId(admin.getAdminId());
        List<String> accessibleSquadrons = new ArrayList<>();
        for (AdminUnitScope scope : scopes) {
            if (scope.getSquadron() != null) {
                accessibleSquadrons.add(scope.getSquadron().getSquadronName());
            }
        }

        // If WING_UTM and no explicit scopes, all squadrons are accessible
        if ("WING_UTM".equalsIgnoreCase(admin.getRole()) && accessibleSquadrons.isEmpty()) {
            List<Squadron> allSquadrons = db.getSquadrons().findAll();
            for (Squadron s : allSquadrons) {
                accessibleSquadrons.add(s.getSquadronName());
            }
        }

        String defaultSquadron = accessibleSquadrons.isEmpty() ? "35 MXS" : accessibleSquadrons.get(0);

        return Optional.of(LoginResponse.builder()
                .adminId(admin.getAdminId())
                .email(admin.getEmail())
                .fullName(admin.getFullName())
                .role(admin.getRole())
                .defaultSquadron(defaultSquadron)
                .accessibleSquadrons(accessibleSquadrons)
                .token("mock-jwt-session-" + admin.getAdminId() + "-" + System.currentTimeMillis())
                .build());
    }
}
