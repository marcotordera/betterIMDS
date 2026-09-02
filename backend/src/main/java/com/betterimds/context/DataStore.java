package com.betterimds.context;

import com.betterimds.repository.*;
import org.springframework.stereotype.Component;

/**
 * Central Database Context (Unit of Work).
 * Provides clean, single-point access to all database repositories across the application.
 */
@Component
public class DataStore {

    public final PersonnelRepository personnel;
    public final SquadronRepository squadrons;
    public final CourseMetadataRepository courses;
    public final UnitRequirementRepository requirements;
    public final CompletionTrackerRepository completions;
    public final PersonnelRequirementOverrideRepository overrides;
    public final AdminUserRepository admins;
    public final AdminUnitScopeRepository scopes;

    public DataStore(
            PersonnelRepository personnel,
            SquadronRepository squadrons,
            CourseMetadataRepository courses,
            UnitRequirementRepository requirements,
            CompletionTrackerRepository completions,
            PersonnelRequirementOverrideRepository overrides,
            AdminUserRepository admins,
            AdminUnitScopeRepository scopes) {
        this.personnel = personnel;
        this.squadrons = squadrons;
        this.courses = courses;
        this.requirements = requirements;
        this.completions = completions;
        this.overrides = overrides;
        this.admins = admins;
        this.scopes = scopes;
    }

    public PersonnelRepository getPersonnel() {
        return personnel;
    }

    public SquadronRepository getSquadrons() {
        return squadrons;
    }

    public CourseMetadataRepository getCourses() {
        return courses;
    }

    public UnitRequirementRepository getRequirements() {
        return requirements;
    }

    public CompletionTrackerRepository getCompletions() {
        return completions;
    }

    public PersonnelRequirementOverrideRepository getOverrides() {
        return overrides;
    }

    public AdminUserRepository getAdmins() {
        return admins;
    }

    public AdminUnitScopeRepository getScopes() {
        return scopes;
    }
}
