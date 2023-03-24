package com.example.redstore.repository;

import com.example.redstore.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, String> {
    String db = "railway";
    @Query(value = "SELECT oi.* FROM "+ db +".order_item oi " +
            " join "+ db +".product p on oi.product_id = p.id " +
            " where p.user_id = :productUserId", nativeQuery = true)
    List<OrderItem> findOrderItemByProductUserId(Long productUserId);

    @Query(value = "SELECT oi.* FROM "+ db +".order_item oi where order_id = :orderId", nativeQuery = true)
    List<OrderItem> findOrderItemByOrderId(Long orderId);

    @Query(value = "select oi.* from "+ db +".order_item oi where order_id = :orderId and status = 0", nativeQuery = true)
    Optional<OrderItem> checkStatus(Long orderId);
}