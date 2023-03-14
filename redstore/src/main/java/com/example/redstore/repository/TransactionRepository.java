package com.example.redstore.repository;

import com.example.redstore.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    @Query(value = "Select t.* from shop.transaction t where user_id = :userId", nativeQuery = true)
    Transaction findByUserId(@Param("userId") String userId);
}