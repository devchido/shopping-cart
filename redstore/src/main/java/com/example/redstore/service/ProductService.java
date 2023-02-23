package com.example.redstore.service;

import com.example.redstore.domain.Product;
import com.example.redstore.domain.User;
import com.example.redstore.repository.ProductRepository;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.dto.UserDto;
import com.example.redstore.service.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
    public final ProductRepository productRepository;
    public final ProductMapper productMapper;
    private final UserRepository userRepository;

    // Create new user
    @Transactional
    public void create(ProductDto dto) {



        // Kiểm tra trùng lặp của  slug trong product
        Optional<Product> productOptionalSlug = productRepository.findBySlug(dto.getSlug());
        if (productOptionalSlug.isPresent()){
            throw new RuntimeException("Slug: " + dto.getSlug() + " đã được sử dụng.");
        };

        Product entity =  productMapper.toEntity(dto);

        //Kiểm tra sự tồn tại của User sử dụng
//        Optional<User> userOptionalId = userRepository.findById(String.valueOf(dto.getId()));
//        if (!userOptionalId.isPresent()){
//            throw new RuntimeException("User với Id: " + dto.getId() + " không tồn tại.");
//        };
        // Create At - product
//        Date now = new Date();
        entity.setCreatedAt(Instant.now());
        productRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit user
    @Transactional
    public void edit(Long id, ProductDto dto){
        Product entity = productMapper.toEntity(dto);
        entity.setId(id);
        entity.setUpdatedAt(Instant.now());
        productRepository.save(entity);

        System.out.println("Thực thi edit");
    }

    // Delete user
    @Transactional
    public void delete(Long id) {
        productRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
    }
    // get all
    public List<ProductDto> findAll (){
        List<Product> entity = productRepository.findAll();
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }
}
