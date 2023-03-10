package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Data
public class TransactionDto {
    private Long id;
    private UserDto users;
    private Long userId;
    private OrderDto orders;
    private Long orderId;
    private String code;
    private Short type;
    private Short mode;
    private Short status;
    private Instant createdAt;
    private Instant updatedAt;
    private String content;
}