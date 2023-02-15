package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;


@Data
public class CartItemDto  {
    private Long id;
    private ProductDto product;
    private CartDto cart;
    private String sku;
    private Float price;
    private Float discount;
    private Short quantity;
    private Boolean active;
    private Instant createdAt;
    private Instant updatedAt;
    private String content;
}