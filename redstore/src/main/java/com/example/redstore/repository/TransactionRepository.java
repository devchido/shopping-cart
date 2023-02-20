package com.example.redstore.repository;

import com.example.redstore.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}