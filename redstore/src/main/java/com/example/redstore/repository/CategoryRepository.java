package com.example.redstore.repository;

import com.example.redstore.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {


    // find by slug
    Optional<Category> findBySlug(String slug);
}