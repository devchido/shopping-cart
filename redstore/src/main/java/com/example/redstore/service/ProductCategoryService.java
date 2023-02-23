package com.example.redstore.service;

import com.example.redstore.domain.Category;
import com.example.redstore.domain.ProductCategory;
import com.example.redstore.repository.CategoryRepository;
import com.example.redstore.repository.ProductCategoryRepository;
import com.example.redstore.service.dto.CategoryDto;
import com.example.redstore.service.dto.ProductCategoryDto;
import com.example.redstore.service.mapper.CategoryMapper;
import com.example.redstore.service.mapper.ProductCategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductCategoryMapper productCategoryMapper;

    // Create new user
    @Transactional
    public void create(ProductCategoryDto dto) {
//         Kiểm tra sự kiện Slug nhập vào đã tồn tại hay chưa? nếu rồi thì ngừng và in ra thng báo đã sử dụng.
//        Optional<Category> categoryOptionalSlug = categoryRepository.findBySlug(dto.getSlug());
//        if (categoryOptionalSlug.isPresent()) {
//            throw new RuntimeException("Slug: " + dto.getSlug() + " đã được sử dụng.");
//        }

        ProductCategory entity = productCategoryMapper.toEntity(dto);
        productCategoryRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit user
    @Transactional
    public void edit(Long id, ProductCategoryDto dto) {
        ProductCategory entity = productCategoryMapper.toEntity(dto);
        entity.setId(id);
        productCategoryRepository.save(entity);
        System.out.println("Thực thi edit");
    }

    // Delete user
    @Transactional
    public void delete(Long id) {
        productCategoryRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
    }

    // get all
    public List<ProductCategoryDto> findAll() {
        List<ProductCategory> entity = productCategoryRepository.findAll();
        List<ProductCategoryDto> dtos = productCategoryMapper.toDo(entity);
        return dtos;
    }
}
