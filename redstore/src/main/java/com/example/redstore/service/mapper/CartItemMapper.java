package com.example.redstore.service.mapper;

import com.example.redstore.domain.CartItem;
import com.example.redstore.service.dto.CartItemDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartItemMapper implements EntityMapper<CartItemDto, CartItem> {
    @Override
    public CartItemDto toDo(CartItem entity) {
        CartItemDto dto = new CartItemDto();

        return null;
    }

    @Override
    public CartItem toEntity(CartItemDto dto) {
        return null;
    }

    @Override
    public List<CartItemDto> toDo(List<CartItem> e) {
        return null;
    }

    @Override
    public List<CartItem> toEntity(List<CartItemDto> d) {
        return null;
    }
}
