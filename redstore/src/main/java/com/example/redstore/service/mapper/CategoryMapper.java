package com.example.redstore.service.mapper;

import com.example.redstore.domain.Category;
import com.example.redstore.service.dto.CategoryDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class CategoryMapper implements EntityMapper<CategoryDto, Category>{
    @Override
    public CategoryDto toDo(Category category) {
        return null;
    }

    @Override
    public Category toEntity(CategoryDto categoryDto) {
        return null;
    }

    @Override
    public List<CategoryDto> toDo(List<Category> e) {
        return null;
    }

    @Override
    public List<Category> toEntity(List<CategoryDto> d) {
        return null;
    }
}
