package com.betterimds.controller;

import com.betterimds.dto.DashboardDto.AirmanDto;
import com.betterimds.dto.DashboardDto.DashboardMatrixResponse;
import com.betterimds.dto.RequestDtos.AddAirmanRequest;
import com.betterimds.dto.RequestDtos.BulkDeleteRequest;
import com.betterimds.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
@Tag(name = "Dashboard", description = "UTM Compliance Matrix and Roster Management Endpoints")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/matrix")
    @Operation(summary = "Get squadron compliance matrix and readiness metrics")
    public ResponseEntity<DashboardMatrixResponse> getMatrix(
            @RequestParam(required = false) Integer squadronId,
            @RequestParam(required = false) String squadronName) {
        return ResponseEntity.ok(dashboardService.getDashboardMatrix(squadronId, squadronName));
    }

    @PostMapping("/airmen")
    @Operation(summary = "Add a new Airman to the unit with initial training baseline")
    public ResponseEntity<AirmanDto> addAirman(@RequestBody AddAirmanRequest request) {
        AirmanDto created = dashboardService.addAirman(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/airmen/bulk")
    @Operation(summary = "Remove selected Airmen from unit roster")
    public ResponseEntity<Map<String, Object>> bulkDeleteAirmen(@RequestBody BulkDeleteRequest request) {
        int deleted = dashboardService.bulkDeleteAirmen(request);
        return ResponseEntity.ok(Map.of("success", true, "deletedCount", deleted));
    }
}
