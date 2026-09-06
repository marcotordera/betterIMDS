package com.betterimds.controller;

import com.betterimds.dto.RequestDtos.*;
import com.betterimds.service.TrainingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/training")
@Tag(name = "Training", description = "Course Completion, Waiver, and Exemption Endpoints")
public class TrainingController {

    private final TrainingService trainingService;

    public TrainingController(TrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @PostMapping("/log")
    @Operation(summary = "Log valid course completion for an Airman")
    public ResponseEntity<Map<String, Object>> logCompletion(@RequestBody LogCompletionRequest request) {
        boolean success = trainingService.logCompletion(request);
        return ResponseEntity.ok(Map.of("success", success));
    }

    @PostMapping("/exemption")
    @Operation(summary = "Grant an exemption or waiver for a course requirement")
    public ResponseEntity<Map<String, Object>> grantExemption(@RequestBody GrantExemptionRequest request) {
        boolean success = trainingService.grantExemption(request);
        return ResponseEntity.ok(Map.of("success", success));
    }

    @PostMapping("/invalidate")
    @Operation(summary = "Invalidate / revoke a course completion or exemption (mark Overdue)")
    public ResponseEntity<Map<String, Object>> invalidateCompletion(@RequestBody InvalidateCompletionRequest request) {
        boolean success = trainingService.invalidateCompletion(request);
        return ResponseEntity.ok(Map.of("success", success));
    }

    @PostMapping("/bulk")
    @Operation(summary = "Execute batch training update across multiple Airmen and courses")
    public ResponseEntity<Map<String, Object>> bulkAction(@RequestBody BulkActionRequest request) {
        int updated = trainingService.applyBulkAction(request);
        return ResponseEntity.ok(Map.of("success", true, "updatedRecords", updated));
    }
}
