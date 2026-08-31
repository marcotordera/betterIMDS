package com.betterimds.repository;

import com.betterimds.entity.CourseMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseMetadataRepository extends JpaRepository<CourseMetadata, Integer> {

    // Unique course code lookup
    Optional<CourseMetadata> findByCourseCode(String courseCode);

    boolean existsByCourseCode(String courseCode);

    // Search by title or code keyword
    List<CourseMetadata> findByCourseTitleContainingIgnoreCase(String keyword);
    List<CourseMetadata> findByCourseCodeContainingIgnoreCase(String keyword);
}
