package com.example.redstore.repository;

import com.example.redstore.domain.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, String> {
    List<CartItem> findByCartId(Long cartId);


    @Query(value = "SELECT ci.* FROM shop.cart_item ci " +
            " join shop.product p on ci.product_id = p.id " +
            " where p.user_id = :productUserId", nativeQuery = true)
    List<CartItem> findCartItemByProductUserId(Long productUserId);
}