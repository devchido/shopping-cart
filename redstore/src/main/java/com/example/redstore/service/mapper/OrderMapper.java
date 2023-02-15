package com.example.redstore.service.mapper;

import com.example.redstore.domain.Order;
import com.example.redstore.service.dto.OrderDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class OrderMapper implements EntityMapper<OrderDto, Order>{
    @Override
    public OrderDto toDo(Order order) {
        return null;
    }

    @Override
    public Order toEntity(OrderDto orderDto) {
        return null;
    }

    @Override
    public List<OrderDto> toDo(List<Order> e) {
        return null;
    }

    @Override
    public List<Order> toEntity(List<OrderDto> d) {
        return null;
    }
}
