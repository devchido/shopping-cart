package com.example.redstore.service.dto;

import com.example.redstore.domain.Product;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;
@Data
public class ProductReviewDto {
    private  Long id;
    private  Product product;
    private  String title;
    private  Integer rating;
    private  Integer published;
    private  Instant createdAt;
    private  Instant published_at;
    private  String content;
}