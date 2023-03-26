package com.example.redstore.repository;

import com.example.redstore.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {

    String db = "shop";
    // find by slug
    Optional<Category> findBySlug(String slug);

    @Query(value = " SELECT C from Category C where C.title like concat('%', :title , '%') ")
    List<Category> filter(@Param("title") String title);
}