package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

/**
 * A DTO for the {@link com.example.redstore.domain.Order} entity
 */
@Data
public class OrderDto {
    private Long id;
    private UserDto user;
    private String sessionId;
    private String token;
    private Short status;
    private Float subTotal;
    private Float itemDiscount;
    private Float tax;
    private Float shipping;
    private Float total;
    private String promo;
    private Float discount;
    private Float grandTotal;
    private String firstName;
    private String middleName;
    private String lastName;
    private String mobile;
    private String email;
    private String line1;
    private String line2;
    private String ward;
    private String district;
    private String city;
    private String country;
    private Instant createdAt;
    private Instant updatedAt;
    private String content;
}