package com.betterimds.service;

import com.betterimds.entity.Personnel;
import com.betterimds.entity.Squadron;
import com.betterimds.repository.PersonnelRepository;
import com.betterimds.repository.SquadronRepository;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonnelService {

    private final PersonnelRepository personnelRepository;
    private final SquadronRepository squadronRepository;

    public PersonnelService(PersonnelRepository personnelRepository, SquadronRepository squadronRepository) {
        this.personnelRepository = personnelRepository;
        this.squadronRepository = squadronRepository;
    }

    public List<Personnel> getPersonnelBySquadron(String squadronName) {
        Squadron squadronProbe = new Squadron(null, squadronName);
        Optional<Squadron> targetSquadron = squadronRepository.findOne(Example.of(squadronProbe));

        if (targetSquadron.isPresent()) {
            Personnel personProbe = new Personnel();
            personProbe.setSquadron(targetSquadron.get());
            return personnelRepository.findAll(Example.of(personProbe));
        }

        return List.of();
    }

    public Optional<Personnel> getPersonnelByEdipi(String edipi) {
        Personnel probe = new Personnel();
        probe.setEdipi(edipi);
        return personnelRepository.findOne(Example.of(probe));
    }

    public List<Personnel> getActivePersonnel() {
        Personnel probe = new Personnel();
        probe.setIsActive(true);
        return personnelRepository.findAll(Example.of(probe));
    }

    public List<Personnel> getAllPersonnel() {
        return personnelRepository.findAll();
    }

    public Optional<Personnel> getPersonnelById(Integer id) {
        return personnelRepository.findById(id);
    }

    public Personnel savePersonnel(Personnel personnel) {
        return personnelRepository.save(personnel);
    }

    public void deletePersonnel(Integer id) {
        personnelRepository.deleteById(id);
    }
}
