package com.example.redstore.mapper;

import com.example.redstore.domain.Category;
import com.example.redstore.dto.CategoryDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class CategoryMapper implements EntityMapper<CategoryDto, Category>{
    @Override
    public CategoryDto toDo(Category entity) {
        CategoryDto dto = new CategoryDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setSlug(entity.getSlug());
        dto.setContent(entity.getContent());
        return dto;
    }

    @Override
    public Category toEntity(CategoryDto dto) {
        Category entity = new Category();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setSlug(dto.getSlug());
        entity.setContent(dto.getContent());
        return entity;
    }

    @Override
    public List<CategoryDto> toDo(List<Category> e) {
        List<CategoryDto> dtos = new ArrayList<>();
        e.forEach(category -> {
            CategoryDto dto = toDo(category);
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<Category> toEntity(List<CategoryDto> d) {
        return null;
    }
}
