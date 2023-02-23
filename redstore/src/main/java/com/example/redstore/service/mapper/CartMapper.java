package com.example.redstore.service.mapper;

import com.example.redstore.domain.Cart;
import com.example.redstore.service.dto.CartDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class CartMapper implements EntityMapper<CartDto, Cart>{
    @Autowired
    UserMapper userMapper;
    @Override
    public CartDto toDo(Cart entity) {
        CartDto dto = new CartDto();
        dto.setId(entity.getId());
        dto.setUser(userMapper.toDo(entity.getUser()));
        dto.setSessionId(entity.getSessionId());
//        dto.setToken(entity.getToken());
        dto.setStatus(entity.getStatus());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setMobile(entity.getMobile());
        dto.setEmail(entity.getEmail());
        dto.setLine1(entity.getLine1());
//        dto.setLine2(entity.getLine2());
//        dto.setWard(entity.getWard());
//        dto.setDistrict(entity.getDistrict());
        dto.setCity(entity.getCity());
        dto.setCountry(entity.getCountry());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setContent(entity.getContent());
        return dto;
    }

    @Override
    public Cart toEntity(CartDto dto) {
        Cart entity = new Cart();
        entity.setId(dto.getId());

        // lấy kết quả từ biến ảo userId
//        entity.setUser(userMapper.toEntity(dto.getUser()));
        entity.setSessionId(dto.getSessionId());
        entity.setStatus(dto.getStatus());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setMobile(dto.getMobile());
        entity.setEmail(dto.getEmail());
        entity.setLine1(dto.getLine1());
        entity.setCity(dto.getCity());
        entity.setCountry(dto.getCountry());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        entity.setContent(dto.getContent());
        return entity;
    }

    @Override
    public List<CartDto> toDo(List<Cart> e) {
        List<CartDto> dtos = new ArrayList<>();
        e.forEach(cart -> {
            CartDto dto = toDo(cart);
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<Cart> toEntity(List<CartDto> d) {
        return null;
    }
}
