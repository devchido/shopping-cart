package com.example.redstore.service.mapper;

import com.example.redstore.domain.Cart;
import com.example.redstore.domain.Order;
import com.example.redstore.domain.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartMapOrderMapper implements EntityMapper<Cart, Order>{

    @Autowired
    private CartItemMapOrderItemMapper orderItemMapper;
    @Override
    public Cart toDo(Order order) {
        return null;
    }

    @Override
    public Order toEntity(Cart cart) {
        Order order = new Order();
        order.setUsers(cart.getUsers());
        order.setCarts(cart);

        return order;
    }

    @Override
    public List<Cart> toDo(List<Order> e) {
        return null;
    }

    @Override
    public List<Order> toEntity(List<Cart> d) {
        return null;
    }
}
