package com.example.redstore.service.mapper;

import com.example.redstore.domain.Transaction;
import com.example.redstore.service.dto.TransactionDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class TransactionMapper implements EntityMapper<TransactionDto, Transaction>{
    @Override
    public TransactionDto toDo(Transaction transaction) {
        return null;
    }

    @Override
    public Transaction toEntity(TransactionDto transactionDto) {
        return null;
    }

    @Override
    public List<TransactionDto> toDo(List<Transaction> e) {
        return null;
    }

    @Override
    public List<Transaction> toEntity(List<TransactionDto> d) {
        return null;
    }
}
