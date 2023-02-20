package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

/**
 * A DTO for the {@link com.example.redstore.domain.Cart} entity
 */
@Data
public class CartDto {
    private Long id;
    private UserDto user;
    private String sessionId;
    private String token;
    private Short status;
    private String firstName;
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