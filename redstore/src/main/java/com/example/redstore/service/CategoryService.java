package com.example.redstore.service;

import com.example.redstore.domain.Category;
import com.example.redstore.domain.User;
import com.example.redstore.repository.CartItemRepository;
import com.example.redstore.repository.CategoryRepository;
import com.example.redstore.service.dto.CategoryDto;
import com.example.redstore.service.dto.UserDto;
import com.example.redstore.service.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    // Create new user
    @Transactional
    public void create(CategoryDto dto) {
        // Kiểm tra sự kiện Slug nhập vào đã tồn tại hay chưa? nếu rồi thì ngừng và in ra thng báo đã sử dụng.
        Optional<Category> categoryOptionalSlug = categoryRepository.findBySlug(dto.getSlug());
        if (categoryOptionalSlug.isPresent()) {
            throw new RuntimeException("Slug: " + dto.getSlug() + " đã được sử dụng.");
        }

        Category entity = categoryMapper.toEntity(dto);
        categoryRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit user
    @Transactional
    public void edit(Long id, CategoryDto dto) {
        Category entity = categoryMapper.toEntity(dto);
        entity.setId(id);
        categoryRepository.save(entity);
        System.out.println("Thực thi edit");
    }

    // Delete user
    @Transactional
    public void delete(Long id) {
        categoryRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
    }

    // get all
    public List<CategoryDto> findAll() {
        List<Category> entity = categoryRepository.findAll();
        List<CategoryDto> dtos = categoryMapper.toDo(entity);
        return dtos;
    }
}
