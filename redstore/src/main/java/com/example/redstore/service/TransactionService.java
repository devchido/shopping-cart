package com.example.redstore.service;

import com.example.redstore.domain.*;
import com.example.redstore.repository.*;
import com.example.redstore.service.dto.OrderDto;
import com.example.redstore.service.dto.OrderItemDto;
import com.example.redstore.service.dto.TransactionDto;
import com.example.redstore.service.mapper.OrderItemMapper;
import com.example.redstore.service.mapper.TransactionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TransactionService {
    private final TransactionRepository transactionRepository;
    public final TransactionMapper transactionMapper;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    // Create new
    @Transactional
    public void create(TransactionDto dto) {

        Transaction entity = transactionMapper.toEntity(dto);
        // Set User
//        User userId = userRepository.findById(String.valueOf(dto.getUsers())).orElse(null);


        // Set order (Nếu có order với id đó thì nhận id đó, nếu không thì truyền tham số null)
        Order orderId = orderRepository.findById(String.valueOf(dto.getOrderId())).orElse(null);
        entity.setUsers(orderId.getUsers());
        entity.setOrder(orderId);
        entity.setStatus(0);
        entity.setContent(orderId.getContent());

        // Set create at
        entity.setCreatedAt(Instant.now());
        transactionRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit by Transaction id
    @Transactional
    public void edit(Long id, TransactionDto dto) {
        Transaction entity = transactionMapper.toEntity(dto);
        Transaction transaction = transactionRepository.findById(String.valueOf(id)).orElse(null);
        entity.setId(transaction.getId());
        // Giữ nguyên bản order
        entity.setOrder(transaction.getOrder());
        // Giữ nguyên user tạo transaction
        entity.setUsers(transaction.getUsers());
        // Giữ nguyên thời gian tạo
        entity.setCreatedAt(transaction.getCreatedAt());
        // Set update at
        entity.setUpdatedAt(Instant.now());
        transactionRepository.save(entity);

        System.out.println("Thực thi edit");
    }

    // Delete user
    @Transactional
    public void delete(Long id) {
        transactionRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
    }

    // get all
    public List<TransactionDto> findAll(String field) {
        List<Transaction> entity = transactionRepository.findAll(Sort.by(Sort.Direction.DESC, field));
        List<TransactionDto> dtos = transactionMapper.toDo(entity);
        return dtos;
    }

    public TransactionDto findByUserId(String userId) {
        Transaction entity = transactionRepository.findByUserId(userId);
        TransactionDto dto = transactionMapper.toDo(entity);
        return dto;
    }

    // todo: findAllTransaction
    public Page<TransactionDto> findAllTransaction(int offset, int pageSize, String field, String sort,
                                                   String userId,
                                                   String orderId,
                                                   String username,
                                                   String mobile,
                                                   String email,
                                                   String address,
                                                   String city,
                                                   String country,
                                                   String type,
                                                   String mode,
                                                   String status) {
        Page<Transaction> entity = transactionRepository.findAllTransaction(
                (PageRequest.of(offset, pageSize).withSort(Sort.by(Sort.Direction.valueOf(sort), field))),
                userId, orderId, username, mobile, email, address, city, country, type, mode, status
        );
        Page<TransactionDto> dtos = entity.map(transactionMapper::toDo);
        return dtos;
    }
}
