package com.example.redstore.repository;

import com.example.redstore.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    List<Cart> findAllByUsersId(Long userId);


    @Query(value = "select c.* from shop.cart c where user_id = :userId ", nativeQuery = true)
    List<Cart> findUsersCart(Long userId);
}