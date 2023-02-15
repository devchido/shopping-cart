package com.example.redstore.repository;

import com.example.redstore.domain.ProductCategory;
import com.example.redstore.domain.ProductCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, ProductCategoryId> {
}