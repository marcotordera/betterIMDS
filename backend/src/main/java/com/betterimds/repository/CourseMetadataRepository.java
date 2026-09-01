package com.betterimds.repository;

import com.betterimds.entity.CourseMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseMetadataRepository extends JpaRepository<CourseMetadata, Integer> {
}
