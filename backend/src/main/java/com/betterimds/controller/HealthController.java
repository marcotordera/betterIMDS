package com.betterimds.controller;

import com.betterimds.context.DataStore;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "System Health", description = "Endpoints for load balancer health probes and cloud uptime monitoring")
public class HealthController {

    private final DataStore db;

    public HealthController(DataStore db) {
        this.db = db;
    }

    @GetMapping
    @Operation(summary = "Application & Database Health Probe", description = "Returns 200 OK with database connection status and timestamp")
    public ResponseEntity<Map<String, Object>> getHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "BetterIMDS API");
        health.put("timestamp", Instant.now().toString());

        try {
            long squadronCount = db.getSquadrons().count();
            health.put("database", "CONNECTED");
            health.put("squadronsConfigured", squadronCount);
            return ResponseEntity.ok(health);
        } catch (Exception e) {
            health.put("status", "DEGRADED");
            health.put("database", "DISCONNECTED: " + e.getMessage());
            return ResponseEntity.status(503).body(health);
        }
    }
}
