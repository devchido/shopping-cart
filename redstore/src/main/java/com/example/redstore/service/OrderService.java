package com.example.redstore.service;

import com.example.redstore.domain.Order;
import com.example.redstore.domain.Product;
import com.example.redstore.repository.OrderRepository;
import com.example.redstore.service.dto.OrderDto;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public List<OrderDto> findByUsers(Long users) {
        List<Order> entity = orderRepository.findByUsers(users);
        List<OrderDto> dtos = orderMapper.toDo(entity);
        return dtos;
    }
}
