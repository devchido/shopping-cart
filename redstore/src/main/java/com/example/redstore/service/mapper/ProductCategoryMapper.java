package com.example.redstore.service.mapper;

import com.example.redstore.domain.ProductCategory;
import com.example.redstore.service.dto.ProductCategoryDto;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class ProductCategoryMapper implements EntityMapper<ProductCategoryDto, ProductCategory>{

    @Override
    public ProductCategoryDto toDo(ProductCategory productCategory) {
        return null;
    }

    @Override
    public ProductCategory toEntity(ProductCategoryDto productCategoryDto) {
        return null;
    }

    @Override
    public List<ProductCategoryDto> toDo(List<ProductCategory> e) {
        return null;
    }

    @Override
    public List<ProductCategory> toEntity(List<ProductCategoryDto> d) {
        return null;
    }
}
