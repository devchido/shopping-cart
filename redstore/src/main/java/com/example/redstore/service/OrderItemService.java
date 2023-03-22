package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.*;
import com.example.redstore.repository.*;
import com.example.redstore.service.dto.OrderItemDto;
import com.example.redstore.service.mapper.OrderItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;
    public final OrderItemMapper orderItemMapper;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    // Create new
    @Transactional
    public void create(OrderItemDto dto) {

        OrderItem entity = orderItemMapper.toEntity(dto);
        // Set product
        Product productId = productRepository.findById(String.valueOf(dto.getProductId())).orElse(null);
        entity.setProducts(productId);

        // Set order (Nếu có order với id đó thì nhận id đó, nếu không thì truyền tham số null)
        Order orderId = orderRepository.findById(String.valueOf(dto.getOrders())).orElse(null);
        entity.setOrders(orderId);

        // Set create at
        //khong can nua
//        entity.setCreatedAt(Instant.now());
        orderItemRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit user
    @Transactional
    public void edit(Long id, OrderItemDto dto) {
        OrderItem entity = orderItemMapper.toEntity(dto);
        entity.setId(id);

        // Set update at
        entity.setUpdatedAt(Instant.now());
        orderItemRepository.save(entity);

        System.out.println("Thực thi edit");
    }

    // Delete user
    @Transactional
    public void delete(Long id) {
        orderItemRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
    }

    // get all
    public List<OrderItemDto> findAll() {
        List<OrderItem> entity = orderItemRepository.findAll();
        List<OrderItemDto> dtos = orderItemMapper.toDo(entity);
        return dtos;
    }

    public List<OrderItemDto> findOrderItemByProductUserId() {
        Long productUserId = SecurityUtils.getPrincipal().getId();
        List<OrderItem> entity = orderItemRepository.findOrderItemByProductUserId(productUserId);
        List<OrderItemDto> dtos = orderItemMapper.toDo(entity);
        return dtos;
    }

    public List<OrderItemDto> findOrderItemByOrderId(String orderDetail) {
        Order order = orderRepository.findById(orderDetail).orElse(null);
        List<OrderItem> entity = orderItemRepository.findOrderItemByOrderId(order.getId());
        List<OrderItemDto> dtos = orderItemMapper.toDo(entity);
        return dtos;
    }

    public void confirmOrderItemsStatus(String id, OrderItemDto dto) {
        OrderItem entity = orderItemRepository.findById(id).orElse(null);

        entity.setStatus(dto.getStatus());

        entity.setUpdatedAt(Instant.now());
        orderItemRepository.save(entity);

        System.out.println("Thực thi xác nhận status");
        Order order = orderRepository.findById(String.valueOf(entity.getOrders().getId())).orElse(null);
        OrderItem check = orderItemRepository.checkStatus(order.getId()).orElse(null);
        if (check == null){
            order.setStatus((short) 1);
            orderRepository.save(order);
            System.out.println("Order được xác nhận");
        }else {
            order.setStatus((short) 0);
            orderRepository.save(order);
            System.out.println("Order chưa được xác nhận");
        }

    }
}
