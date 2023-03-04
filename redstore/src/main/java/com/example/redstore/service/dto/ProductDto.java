package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Data
public class ProductDto {
    private Long id;
    private UserDto user;
    private String title;
    private String photos;
    //    private String metaTitle;
    private String slug;
    private String summary;
    //    private Short type;
    //    private String sku;
    private Float price;
    private Float discount;
    private Short quantity;
    private Boolean shop;
    private Instant createdAt;
    private Instant updatedAt;
//    private Instant publishedAt;
//    private Instant startsAt;
    private Instant endsAt;
    private String content;
}