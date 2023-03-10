package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;


@Data
public class OrderDto {
    private Long id;
    private UserDto users;
    private Long userId;
    private CartDto carts;
    private Long cartId;
    private Short status;
    private Float subTotal;
    private Float itemDiscount;
    private Float total;
    private String firstName;
    private String lastName;
    private String mobile;
    private String email;
    private String line1;
    private String city;
    private String country;
    private Instant createdAt;
    private Instant updatedAt;
    private String content;
}