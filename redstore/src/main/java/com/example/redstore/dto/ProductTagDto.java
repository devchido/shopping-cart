package com.example.redstore.dto;

import com.example.redstore.domain.Product;
import com.example.redstore.domain.Tag;
import lombok.Data;

import java.io.Serializable;
@Data
public class ProductTagDto {
    private Long id;
    private Product product;
    private Tag tag;
}