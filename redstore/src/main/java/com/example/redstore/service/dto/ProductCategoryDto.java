package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ProductCategoryDto  {
    private ProductCategoryIdDto id;
    private ProductDto product;
    private CategoryDto category;
}