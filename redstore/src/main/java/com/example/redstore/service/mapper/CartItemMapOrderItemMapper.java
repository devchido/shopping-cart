package com.example.redstore.service.mapper;

import com.example.redstore.domain.CartItem;
import com.example.redstore.domain.OrderItem;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CartItemMapOrderItemMapper implements EntityMapper<CartItem, OrderItem>{
    @Override
    public CartItem toDo(OrderItem orderItem) {
        return null;
    }

    @Override
    public OrderItem toEntity(CartItem cartItem) {
        OrderItem orderItem = new OrderItem();
        orderItem.setProducts(cartItem.getProduct());
        orderItem.setPrice(cartItem.getPrice());
        orderItem.setDiscount(cartItem.getDiscount());
        orderItem.setQuantity(cartItem.getQuantity());
        return orderItem;
    }

    @Override
    public List<CartItem> toDo(List<OrderItem> e) {
        return null;
    }

    @Override
    public List<OrderItem> toEntity(List<CartItem> d) {
        List<OrderItem> orderItems = new ArrayList<>();
        d.forEach(cartItem -> {
            orderItems.add(toEntity(cartItem));
        });
        return orderItems;
    }
}
