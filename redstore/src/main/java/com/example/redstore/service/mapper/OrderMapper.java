package com.example.redstore.service.mapper;

import com.example.redstore.domain.Order;
import com.example.redstore.service.dto.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class OrderMapper implements EntityMapper<OrderDto, Order>{
    @Autowired
    UserMapper userMapper;
    @Override
    public OrderDto toDo(Order entity) {
        OrderDto dto = new OrderDto();
        dto.setId(entity.getId());
        dto.setUser(userMapper.toDo(entity.getUser()));
        dto.setSessionId(entity.getSessionId());
        dto.setToken(entity.getToken());
        dto.setStatus(entity.getStatus());
        dto.setSubTotal(entity.getSubTotal());
        dto.setItemDiscount(entity.getItemDiscount());
        dto.setTax(entity.getTax());
        dto.setShipping(entity.getShipping());
        dto.setTotal(entity.getTotal());
        dto.setPromo(entity.getPromo());
        dto.setDiscount(entity.getDiscount());
        dto.setGrandTotal(entity.getGrandTotal());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setMobile(entity.getMobile());
        dto.setEmail(entity.getEmail());
        dto.setLine1(entity.getLine1());
        dto.setLine2(entity.getLine2());
        dto.setWard(entity.getWard());
        dto.setDistrict(entity.getDistrict());
        dto.setCity(entity.getCity());
        dto.setCountry(entity.getCity());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setContent(entity.getContent());
        return dto;
    }

    @Override
    public Order toEntity(OrderDto dto) {
        Order entity = new Order();
        entity.setId(dto.getId());
        entity.setUser(userMapper.toEntity(dto.getUser()));
        entity.setSessionId(dto.getSessionId());
        entity.setToken(dto.getToken());
        entity.setStatus(dto.getStatus());
        entity.setSubTotal(dto.getSubTotal());
        entity.setItemDiscount(dto.getItemDiscount());
        entity.setTax(dto.getTax());
        entity.setShipping(dto.getShipping());
        entity.setTotal(dto.getTotal());
        entity.setPromo(dto.getPromo());
        entity.setDiscount(dto.getDiscount());
        entity.setGrandTotal(dto.getGrandTotal());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setMobile(dto.getMobile());
        entity.setEmail(dto.getEmail());
        entity.setLine1(dto.getLine1());
        entity.setLine2(dto.getLine2());
        entity.setWard(dto.getWard());
        entity.setDistrict(dto.getDistrict());
        entity.setCity(dto.getCity());
        entity.setCountry(dto.getCity());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        entity.setContent(dto.getContent());
        return entity;
    }

    @Override
    public List<OrderDto> toDo(List<Order> e) {
        List<OrderDto> dtos = new ArrayList<>();
        e.forEach(order -> {
            OrderDto dto = toDo(order);
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<Order> toEntity(List<OrderDto> d) {
        return null;
    }
}
