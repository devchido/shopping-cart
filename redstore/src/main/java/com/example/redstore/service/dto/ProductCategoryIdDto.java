package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ProductCategoryIdDto {
    private Long productId;
    private Long categoryId;
}