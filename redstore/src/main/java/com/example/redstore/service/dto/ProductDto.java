package com.example.redstore.service.dto;

import com.example.redstore.projection.RatingInfo;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Data
public class ProductDto {
    private Long id;
    private UserDto users;
    private Long userId;
    private String title;
    private String slug;
    private String summary;
    private Float price;
    private Float discount;
    private String photos;
    private Integer quantity;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant endsAt;
    private Integer status;
    private String content;
    private String category;
    private RatingInfo rating;
}