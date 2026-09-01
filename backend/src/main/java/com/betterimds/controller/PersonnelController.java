package com.betterimds.controller;

import com.betterimds.entity.Personnel;
import com.betterimds.service.PersonnelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personnel")
public class PersonnelController {

    private final PersonnelService personnelService;

    public PersonnelController(PersonnelService personnelService) {
        this.personnelService = personnelService;
    }

    @GetMapping
    public List<Personnel> getPersonnel(@RequestParam(required = false) String unit) {
        if (unit != null && !unit.isBlank()) {
            return personnelService.getPersonnelByUnit(unit.trim());
        }
        return personnelService.getAllPersonnel();
    }

    @GetMapping("/unit/{unit}")
    public List<Personnel> getPersonnelByUnit(@PathVariable String unit) {
        return personnelService.getPersonnelByUnit(unit);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Personnel> getPersonnelById(@PathVariable Integer id) {
        return personnelService.getPersonnelById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/edipi/{edipi}")
    public ResponseEntity<Personnel> getPersonnelByEdipi(@PathVariable String edipi) {
        return personnelService.getPersonnelByEdipi(edipi)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Personnel createPersonnel(@RequestBody Personnel personnel) {
        return personnelService.savePersonnel(personnel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersonnel(@PathVariable Integer id) {
        personnelService.deletePersonnel(id);
        return ResponseEntity.noContent().build();
    }
}
