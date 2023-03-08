package com.example.redstore.repository;

import com.example.redstore.domain.Product;
import com.example.redstore.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@Repository
public interface ProductRepository extends JpaRepository<Product, String> {


    @Query(value = "SELECT t.* " +
            "FROM shop.product t " +
            "WHERE id like concat('%',:keySearch, '%') " +
            "or user_id like concat('%', :keySearch, '%')" +
            "or title like concat('%', :keySearch, '%')" +
            "or content like concat('%', :keySearch, '%')"
            , nativeQuery = true)
    List<Product> filter(@Param("keySearch") String keySearch
    );

    // find by sulg
    Optional<Product> findBySlug(String slug);

    @Query(value = "SELECT t.* FROM shop.product t " +
            "        WHERE user_id = :users", nativeQuery = true)
    List<Product> findByUsers(@Param("users") Long users);

    @Query(value = "select P from Product P ")
    Page<Product> findAllProductPage(Pageable pageable);
}