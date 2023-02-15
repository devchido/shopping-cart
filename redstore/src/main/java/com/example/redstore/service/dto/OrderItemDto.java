package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Data
public class OrderItemDto {
    private Long id;
    private ProductDto product;
    private OrderDto order;
    private String sku;
    private Float price;
    private Float discount;
    private Short quantity;
    private Instant createdAt;
    private Instant updatedAt;
    private String content;
}