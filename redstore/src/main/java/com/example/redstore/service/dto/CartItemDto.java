package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;


@Data
public class CartItemDto  {
    private Long id;
    private ProductDto product;
    // Biến ảo nhận id của product
    private Long productId;
    private CartDto cart;
    // Biến ảo nhận id của cart
    private Long cartId;
    private String sku;
    private Float price;
    private Float discount;
    private Short quantity;
    private Boolean active;
    private Instant createdAt;
    private Instant updatedAt;
    private String content;
}