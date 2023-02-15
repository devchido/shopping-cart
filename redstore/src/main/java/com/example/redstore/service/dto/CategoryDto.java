package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;


@Data
public class CategoryDto {
    private Long id;
    private String title;
    private String metaTitle;
    private String slug;
    private String content;
}