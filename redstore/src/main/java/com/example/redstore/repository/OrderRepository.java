package com.example.redstore.repository;

import com.example.redstore.domain.Order;
import com.example.redstore.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    String db = "railway";
    @Query(value = "SELECT t.* FROM "+ db +".order t " +
            "        WHERE user_id = :users and status like concat( :status )", nativeQuery = true)
    List<Order> findByUsers(@Param("users") Long users, @Param("status") String status) ;

    @Query(value = "SELECT t.* FROM "+ db +".order t " +
            "        WHERE cart_id = :carts", nativeQuery = true)
    List<Order> findByCarts(@Param("carts") Long carts);
}