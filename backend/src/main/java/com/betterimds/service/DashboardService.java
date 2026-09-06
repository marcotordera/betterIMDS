package com.betterimds.service;

import com.betterimds.context.DataStore;
import com.betterimds.dto.DashboardDto.*;
import com.betterimds.dto.RequestDtos.AddAirmanRequest;
import com.betterimds.dto.RequestDtos.BulkDeleteRequest;
import com.betterimds.entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class DashboardService {

    private final DataStore db;

    public DashboardService(DataStore db) {
        this.db = db;
    }

    public DashboardMatrixResponse getDashboardMatrix(Integer squadronId, String squadronName) {
        Optional<Squadron> squadronOpt = Optional.empty();
        if (squadronId != null) {
            squadronOpt = db.getSquadrons().findById(squadronId);
        } else if (squadronName != null && !squadronName.isBlank()) {
            squadronOpt = db.getSquadrons().findBySquadronName(squadronName.trim());
        }

        Squadron squadron = squadronOpt.orElseGet(() ->
                db.getSquadrons().findAll().stream().findFirst().orElse(new Squadron(1, "35 MXS"))
        );

        List<Personnel> personnelList = db.getPersonnel().findBySquadron_SquadronIdAndIsActiveTrue(squadron.getSquadronId());
        List<CourseMetadata> courseList = db.getCourses().findAll();

        List<CompletionTracker> completions = db.getCompletions().findByTrainee_Squadron_SquadronId(squadron.getSquadronId());
        List<PersonnelRequirementOverride> overrides = db.getOverrides().findByTrainee_Squadron_SquadronId(squadron.getSquadronId());

        // Index completions by "traineeUid:courseCode"
        Map<String, CompletionTracker> completionMap = completions.stream()
                .collect(Collectors.toMap(
                        c -> c.getTrainee().getUid() + ":" + c.getCourse().getCourseCode(),
                        c -> c,
                        (existing, replacing) -> replacing
                ));

        // Index overrides by "traineeUid:courseCode"
        Map<String, PersonnelRequirementOverride> overrideMap = overrides.stream()
                .collect(Collectors.toMap(
                        o -> o.getTrainee().getUid() + ":" + o.getCourse().getCourseCode(),
                        o -> o,
                        (existing, replacing) -> replacing
                ));

        LocalDate today = LocalDate.now();
        LocalDate expiringThreshold = today.plusDays(30);

        int totalCells = 0;
        int validCells = 0;
        int overdueCount = 0;
        int expiringCount = 0;
        int waiverCount = 0;

        List<AirmanMatrixRowDto> rosterRows = new ArrayList<>();

        for (Personnel person : personnelList) {
            Map<String, StatusDetailDto> courseStatusMap = new HashMap<>();

            for (CourseMetadata course : courseList) {
                totalCells++;
                String key = person.getUid() + ":" + course.getCourseCode();

                if (overrideMap.containsKey(key)) {
                    PersonnelRequirementOverride override = overrideMap.get(key);
                    waiverCount++;
                    validCells++; // Waivers count towards readiness
                    courseStatusMap.put(course.getCourseCode(), StatusDetailDto.builder()
                            .status("WAIVER")
                            .reason(override.getReason())
                            .build());
                } else if (completionMap.containsKey(key)) {
                    CompletionTracker tracker = completionMap.get(key);
                    LocalDate expDate = tracker.getExpirationDate();

                    String status;
                    if (expDate != null && expDate.isBefore(today)) {
                        status = "OVERDUE";
                        overdueCount++;
                    } else if (expDate != null && !expDate.isAfter(expiringThreshold)) {
                        status = "EXPIRING";
                        expiringCount++;
                        validCells++;
                    } else {
                        status = "VALID";
                        validCells++;
                    }

                    courseStatusMap.put(course.getCourseCode(), StatusDetailDto.builder()
                            .status(status)
                            .completedDate(tracker.getCompletedDate() != null ? tracker.getCompletedDate().toString() : null)
                            .expirationDate(expDate != null ? expDate.toString() : null)
                            .build());
                } else {
                    overdueCount++;
                    courseStatusMap.put(course.getCourseCode(), StatusDetailDto.builder()
                            .status("OVERDUE")
                            .build());
                }
            }

            rosterRows.add(AirmanMatrixRowDto.builder()
                    .airman(AirmanDto.builder()
                            .uid(person.getUid())
                            .edipi(person.getEdipi())
                            .firstName(person.getFirstName())
                            .lastName(person.getLastName())
                            .rank(person.getRank())
                            .email(person.getEmail())
                            .squadronId(squadron.getSquadronId())
                            .build())
                    .courses(courseStatusMap)
                    .build());
        }

        double readinessPct = totalCells > 0
                ? Math.round((double) validCells / totalCells * 1000.0) / 10.0
                : 100.0;

        DashboardMetricsDto metrics = DashboardMetricsDto.builder()
                .readinessPercentage(readinessPct)
                .totalAirmen(personnelList.size())
                .overdueCount(overdueCount)
                .expiringCount(expiringCount)
                .waiverCount(waiverCount)
                .build();

        List<CourseDto> courseDtos = courseList.stream()
                .map(c -> CourseDto.builder()
                        .courseId(c.getCourseId())
                        .courseCode(c.getCourseCode())
                        .courseTitle(c.getCourseTitle())
                        .frequencyMonths(c.getFrequencyMonths())
                        .gracePeriodDays(c.getGracePeriodDays())
                        .build())
                .collect(Collectors.toList());

        return DashboardMatrixResponse.builder()
                .squadronId(squadron.getSquadronId())
                .squadronName(squadron.getSquadronName())
                .metrics(metrics)
                .roster(rosterRows)
                .courses(courseDtos)
                .build();
    }

    public AirmanDto addAirman(AddAirmanRequest request) {
        Integer squadronId = request.getSquadronId() != null ? request.getSquadronId() : 1;
        Squadron squadron = db.getSquadrons().findById(squadronId)
                .orElseGet(() -> db.getSquadrons().findAll().get(0));

        Personnel person = new Personnel();
        person.setRank(request.getRank() != null ? request.getRank() : "SrA");
        person.setFirstName(request.getFirstName() != null ? request.getFirstName().trim() : "First");
        person.setLastName(request.getLastName() != null ? request.getLastName().trim() : "Last");
        person.setEdipi(request.getEdipi() != null ? request.getEdipi().trim() : "1035000000");
        person.setEmail(request.getEmail() != null ? request.getEmail().trim() : "airman@test.com");
        person.setSquadron(squadron);
        person.setIsActive(true);
        person.setCreatedAt(LocalDateTime.now());

        Personnel saved = db.getPersonnel().save(person);

        // Generate baseline courses tracker
        String initialStatus = request.getInitialStatus() != null ? request.getInitialStatus() : "EXPIRING";
        List<CourseMetadata> allCourses = db.getCourses().findAll();
        LocalDate now = LocalDate.now();

        for (CourseMetadata course : allCourses) {
            CompletionTracker tracker = new CompletionTracker();
            tracker.setTrainee(saved);
            tracker.setCourse(course);
            tracker.setCreatedAt(LocalDateTime.now());

            if ("EXPIRING".equalsIgnoreCase(initialStatus)) {
                tracker.setCompletedDate(now.minusMonths(course.getFrequencyMonths() != null ? course.getFrequencyMonths() - 1 : 11));
                tracker.setExpirationDate(now.plusDays(30));
            } else if ("VALID".equalsIgnoreCase(initialStatus)) {
                tracker.setCompletedDate(now);
                tracker.setExpirationDate(now.plusMonths(course.getFrequencyMonths() != null ? course.getFrequencyMonths() : 12));
            } else {
                // OVERDUE baseline: no completion or expired
                tracker.setCompletedDate(now.minusYears(2));
                tracker.setExpirationDate(now.minusDays(30));
            }
            db.getCompletions().save(tracker);
        }

        return AirmanDto.builder()
                .uid(saved.getUid())
                .edipi(saved.getEdipi())
                .firstName(saved.getFirstName())
                .lastName(saved.getLastName())
                .rank(saved.getRank())
                .email(saved.getEmail())
                .squadronId(squadron.getSquadronId())
                .build();
    }

    public int bulkDeleteAirmen(BulkDeleteRequest request) {
        if (request.getAirmanIds() == null || request.getAirmanIds().isEmpty()) {
            return 0;
        }

        int count = 0;
        for (Integer uid : request.getAirmanIds()) {
            if (uid != null && db.getPersonnel().existsById(uid)) {
                db.getPersonnel().deleteById(uid);
                count++;
            }
        }
        return count;
    }
}
