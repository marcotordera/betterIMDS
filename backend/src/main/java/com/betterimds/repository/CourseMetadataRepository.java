package com.betterimds.repository;

import com.betterimds.entity.CourseMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseMetadataRepository extends JpaRepository<CourseMetadata, Integer> {
    Optional<CourseMetadata> findByCourseCode(String courseCode);
}
