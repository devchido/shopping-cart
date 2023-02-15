package com.example.redstore.service.mapper;

import com.example.redstore.domain.Cart;
import com.example.redstore.service.dto.CartDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class CartMapper implements EntityMapper<CartDto, Cart>{
    @Override
    public CartDto toDo(Cart cart) {
        return null;
    }

    @Override
    public Cart toEntity(CartDto cartDto) {
        return null;
    }

    @Override
    public List<CartDto> toDo(List<Cart> e) {
        return null;
    }

    @Override
    public List<Cart> toEntity(List<CartDto> d) {
        return null;
    }
}
