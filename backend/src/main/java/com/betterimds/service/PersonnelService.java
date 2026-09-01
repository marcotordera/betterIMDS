package com.betterimds.service;

import com.betterimds.entity.Personnel;
import com.betterimds.repository.PersonnelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PersonnelService {

    private final PersonnelRepository personnelRepository;

    public PersonnelService(PersonnelRepository personnelRepository) {
        this.personnelRepository = personnelRepository;
    }

    public List<Personnel> getPersonnelByUnit(String unit) {
        return personnelRepository.findBySquadron(unit);
    }

    public List<Personnel> getAllPersonnel() {
        return personnelRepository.findAll();
    }

    public List<Personnel> getActivePersonnel() {
        return personnelRepository.findActive();
    }

    public Optional<Personnel> getPersonnelById(Integer id) {
        if (id != null) {
            return personnelRepository.findById(id);
        }
        return Optional.empty();
    }

    public Optional<Personnel> getPersonnelByEdipi(String edipi) {
        return personnelRepository.findByEdipi(edipi);
    }

    @Transactional
    public Personnel savePersonnel(Personnel personnel) {
        if (personnel != null) {
            return personnelRepository.save(personnel);
        }
        return null;
    }

    @Transactional
    public void deletePersonnel(Integer id) {
        if (id != null) {
            personnelRepository.deleteById(id);
        }
    }
}
