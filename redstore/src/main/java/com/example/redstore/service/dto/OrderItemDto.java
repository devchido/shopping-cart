package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Data
public class OrderItemDto {
    private Long id;
    private ProductDto products;

    // Biến ảo id của product
    private Long productId;
    private OrderDto orders;
    // Biến ảo id của order
    private Long orderId;
    private String sku;
    private Float price;
    private Float discount;
    private Short quantity;

    private Instant createdAt;
    private Instant updatedAt;
    private String content;
}