package com.betterimds.repository;

import com.betterimds.entity.CourseMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseMetadataRepository extends JpaRepository<CourseMetadata, Integer> {

    @Query("SELECT c FROM CourseMetadata c WHERE c.courseCode = :code")
    Optional<CourseMetadata> findByCourseCode(String code);

    @Query("SELECT c FROM CourseMetadata c WHERE LOWER(c.courseTitle) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<CourseMetadata> searchByTitle(String keyword);
}
