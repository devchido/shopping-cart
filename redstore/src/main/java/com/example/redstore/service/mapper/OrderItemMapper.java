package com.example.redstore.service.mapper;

import com.example.redstore.domain.OrderItem;
import com.example.redstore.service.dto.OrderItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class OrderItemMapper implements EntityMapper<OrderItemDto, OrderItem>{
    @Autowired
    ProductMapper productMapper;
    @Autowired
    OrderMapper orderMapper;
    @Override
    public OrderItemDto toDo(OrderItem entity) {
        OrderItemDto dto = new OrderItemDto();
        dto.setId(entity.getId());
        dto.setProducts(productMapper.toDo(entity.getProducts()));
        dto.setOrders(orderMapper.toDo(entity.getOrders()));
        dto.setPrice(entity.getPrice());
        dto.setDiscount(entity.getDiscount());
        dto.setQuantity(entity.getQuantity());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setContent(entity.getContent());
        return dto;
    }

    @Override
    public OrderItem toEntity(OrderItemDto dto) {
        OrderItem entity = new OrderItem();
        entity.setId(dto.getId());
        // product, order
        entity.setPrice(dto.getPrice());
        entity.setDiscount(dto.getDiscount());
        entity.setQuantity(dto.getQuantity());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        entity.setContent(dto.getContent());
        return entity;
    }

    @Override
    public List<OrderItemDto> toDo(List<OrderItem> e) {
        List<OrderItemDto> dtos = new ArrayList<>();
        e.forEach(orderItem -> {
            OrderItemDto dto = toDo(orderItem);
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<OrderItem> toEntity(List<OrderItemDto> d) {
        return null;
    }
}
