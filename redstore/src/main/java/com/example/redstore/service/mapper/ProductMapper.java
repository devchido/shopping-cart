package com.example.redstore.service.mapper;

import com.example.redstore.domain.Product;
import com.example.redstore.service.dto.ProductDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class ProductMapper implements EntityMapper<ProductDto, Product>{
    @Override
    public ProductDto toDo(Product product) {
        return null;
    }

    @Override
    public Product toEntity(ProductDto productDto) {
        return null;
    }

    @Override
    public List<ProductDto> toDo(List<Product> e) {
        return null;
    }

    @Override
    public List<Product> toEntity(List<ProductDto> d) {
        return null;
    }
}
