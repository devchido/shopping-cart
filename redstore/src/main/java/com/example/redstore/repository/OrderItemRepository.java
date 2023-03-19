package com.example.redstore.repository;

import com.example.redstore.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, String> {
    @Query(value = "SELECT oi.* FROM shop.order_item oi " +
            " join shop.product p on oi.product_id = p.id " +
            " where p.user_id = :productUserId", nativeQuery = true)
    List<OrderItem> findOrderItemByProductUserId(Long productUserId);
}