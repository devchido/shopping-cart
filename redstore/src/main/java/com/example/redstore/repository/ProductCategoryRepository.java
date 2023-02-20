package com.example.redstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, ProductCategoryId> {
}