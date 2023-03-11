package com.example.redstore.service;

import com.example.redstore.domain.*;
import com.example.redstore.repository.*;
import com.example.redstore.service.dto.OrderDto;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.mapper.CartItemMapOrderItemMapper;
import com.example.redstore.service.mapper.CartItemMapper;
import com.example.redstore.service.mapper.CartMapOrderMapper;
import com.example.redstore.service.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartMapOrderMapper cartMapOrderMapper;

    private final CartItemMapOrderItemMapper orderItemMapper;
    private final CartItemRepository cartItemRepository;
    private final OrderItemRepository orderItemRepository;

    public List<OrderDto> findByUsers(Long users) {
        List<Order> entity = orderRepository.findByUsers(users);
        List<OrderDto> dtos = orderMapper.toDo(entity);
        return dtos;
    }
    public List<OrderDto> findByCarts(Long carts) {
        List<Order> entity = orderRepository.findByCarts(carts);
        List<OrderDto> dtos = orderMapper.toDo(entity);
        return dtos;
    }

    @Transactional
    public void create(OrderDto dto){
        Cart cart = cartRepository.findById(String.valueOf(dto.getCartId())).orElse(null);
        Order entity = orderMapper.toEntity(dto);
        // Set userId
//        User user = userRepository.findById(String.valueOf(dto.getUserId())).orElse(null);
//        entity.setUsers(user);
        //Set cart

        entity.setCarts(cart);
        // Set user từ giỏ hàng cart
        entity.setUsers(cart.getUsers());
        //Set các thông tin liên quan
        entity.setFirstName(cart.getFirstName());
        //Set Last Name
        entity.setLastName(cart.getLastName());
        // Set Mobile
        entity.setMobile(cart.getMobile());
        // Set Email
        entity.setEmail(cart.getEmail());
        // Set địa chỉ giao hàng
        entity.setLine1(cart.getLine1());
        entity.setCity(cart.getCity());
        entity.setCountry(cart.getCountry());
        entity.setContent(cart.getContent());
        // Set create at
        entity.setCreatedAt(Instant.now());
        orderRepository.save(entity);
        cart.setStatus((short) 1);
        cartRepository.save(cart);
    }
    public void edit(Long id, OrderDto dto){

        Order entity = orderMapper.toEntity(dto);
        Order order = orderRepository.findById(String.valueOf(id)).orElse(null);
        Cart cart = cartRepository.findById(String.valueOf(order.getCarts())).orElse(null);
        //
        entity.setId(order.getId());

        entity.setCarts(order.getCarts());
        // Set thông tin user
        entity.setUsers(cart.getUsers());
        entity.setFirstName(cart.getFirstName());
        entity.setLastName(cart.getLastName());
        entity.setMobile(cart.getMobile());
        entity.setEmail(cart.getEmail());
        // set update
        entity.setUpdatedAt(Instant.now());
        orderRepository.save(entity);
    }

    public List<OrderDto> findAll(){
        List<Order> entity = orderRepository.findAll();
        List<OrderDto> dtos = orderMapper.toDo(entity);
        return dtos;

    }


    public void createOrderByCart(Long id) {
        Cart cart = cartRepository.findById(String.valueOf(id)).orElseThrow();
        // dùng tạm cách này vậy
        List<CartItem> cartItem = cartItemRepository.findByCartId(id);

        Order order = cartMapOrderMapper.toEntity(cart);



        //todo: Set các thuộc tính not null(làm sau)
        //viết như này mai sau tìm xem minh chua lam cai gi cho de
        order.setCreatedAt(Instant.now());
        order.setItemDiscount(1F);
        order.setStatus((short) 0);
        order.setSubTotal((float) 0);
        order.setTotal((float) 0);
        // Lưu
        orderRepository.save(order);

        List<OrderItem> orderItem = orderItemMapper.toEntity(cartItem);
        orderItem.forEach(orderItem1 -> {
            orderItem1.setOrders(order);
            orderItem1.setDiscount(0f);
            orderItem1.setPrice(0f);
            orderItem1.setQuantity((short)0);

        });
        orderItemRepository.saveAll(orderItem);
    }
}
