package com.example.redstore.service.mapper;

import com.example.redstore.domain.Product;
import com.example.redstore.service.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class ProductMapper implements EntityMapper<ProductDto, Product>{

    @Autowired
    UserMapper userMapper;
    @Override
    public ProductDto toDo(Product entity) {
        ProductDto dto = new ProductDto();
        dto.setId(entity.getId());
        dto.setUser(userMapper.toDo(entity.getUser()));
        dto.setTitle(entity.getTitle());
        dto.setMetaTitle(entity.getMetaTitle());
        dto.setSlug(entity.getSlug());
        dto.setSummary(entity.getSummary());
        dto.setType(entity.getType());
        dto.setSku(entity.getSku());
        dto.setPrice(entity.getPrice());
        dto.setDiscount(entity.getDiscount());
        dto.setQuantity(entity.getQuantity());
        dto.setShop(entity.getShop());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setPublishedAt(entity.getPublishedAt());
        dto.setStartsAt(entity.getStartsAt());
        dto.setEndsAt(entity.getEndsAt());
        dto.setContent(entity.getContent());
        return dto;
    }

    @Override
    public Product toEntity(ProductDto dto) {
        Product entity = new Product();
        entity.setId(dto.getId());
        entity.setUser(userMapper.toEntity(dto.getUser()));
        entity.setTitle(dto.getTitle());
        entity.setMetaTitle(dto.getMetaTitle());
        entity.setSlug(dto.getSlug());
        entity.setSummary(dto.getSummary());
        entity.setType(dto.getType());
        entity.setSku(dto.getSku());
        entity.setPrice(dto.getPrice());
        entity.setDiscount(dto.getDiscount());
        entity.setQuantity(dto.getQuantity());
        entity.setShop(dto.getShop());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        entity.setPublishedAt(dto.getPublishedAt());
        entity.setStartsAt(dto.getStartsAt());
        entity.setEndsAt(dto.getEndsAt());
        entity.setContent(dto.getContent());
        return entity;
    }

    @Override
    public List<ProductDto> toDo(List<Product> e) {
        List<ProductDto> dtos = new ArrayList<>();
        e.forEach(product -> {
            ProductDto dto = toDo(product);
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<Product> toEntity(List<ProductDto> d) {
        return null;
    }
}
