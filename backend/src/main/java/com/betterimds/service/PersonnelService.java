package com.betterimds.service;

import com.betterimds.context.DataStore;
import com.betterimds.entity.Personnel;
import com.betterimds.entity.Squadron;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonnelService {

    private final DataStore db;

    public PersonnelService(DataStore db) {
        this.db = db;
    }

    public List<Personnel> getPersonnelBySquadron(String squadronName) {
        if (squadronName != null && !squadronName.isBlank()) {
            Squadron squadronProbe = new Squadron(null, squadronName);
            Optional<Squadron> targetSquadron = db.getSquadrons().findOne(Example.of(squadronProbe));

            if (targetSquadron.isPresent()) {
                Personnel personProbe = new Personnel();
                personProbe.setSquadron(targetSquadron.get());
                return db.getPersonnel().findAll(Example.of(personProbe));
            }
        }
        return List.of();
    }

    public Optional<Personnel> getPersonnelByEdipi(String edipi) {
        if (edipi != null && !edipi.isBlank()) {
            Personnel probe = new Personnel();
            probe.setEdipi(edipi);
            return db.getPersonnel().findOne(Example.of(probe));
        }
        return Optional.empty();
    }

    public List<Personnel> getActivePersonnel() {
        Personnel probe = new Personnel();
        probe.setIsActive(true);
        return db.getPersonnel().findAll(Example.of(probe));
    }

    public List<Personnel> getAllPersonnel() {
        return db.getPersonnel().findAll();
    }

    public Optional<Personnel> getPersonnelById(Integer id) {
        if (id != null) {
            return db.getPersonnel().findById(id);
        }
        return Optional.empty();
    }

    public Personnel savePersonnel(Personnel personnel) {
        if (personnel != null) {
            return db.getPersonnel().save(personnel);
        }
        return null;
    }

    public void deletePersonnel(Integer id) {
        if (id != null) {
            db.getPersonnel().deleteById(id);
        }
    }
}
