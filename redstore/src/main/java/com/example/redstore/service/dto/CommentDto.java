package com.example.redstore.service.dto;

import com.example.redstore.domain.Product;
import com.example.redstore.domain.User;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Data
public class CommentDto {
    private Long id;
    private ProductDto product;
    private UserDto user;
    private String content;
    private Instant createdAt;
    private Long parentId;
    private String productId;
}