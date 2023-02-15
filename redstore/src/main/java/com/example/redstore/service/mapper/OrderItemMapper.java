package com.example.redstore.service.mapper;

import com.example.redstore.domain.OrderItem;
import com.example.redstore.service.dto.OrderItemDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class OrderItemMapper implements EntityMapper<OrderItemDto, OrderItem>{
    @Override
    public OrderItemDto toDo(OrderItem orderItem) {
        return null;
    }

    @Override
    public OrderItem toEntity(OrderItemDto orderItemDto) {
        return null;
    }

    @Override
    public List<OrderItemDto> toDo(List<OrderItem> e) {
        return null;
    }

    @Override
    public List<OrderItem> toEntity(List<OrderItemDto> d) {
        return null;
    }
}
