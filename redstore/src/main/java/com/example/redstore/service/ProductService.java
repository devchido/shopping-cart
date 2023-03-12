package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.Product;
import com.example.redstore.domain.User;
import com.example.redstore.repository.ProductRepository;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.dto.UserDto;
import com.example.redstore.service.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

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
        if (productOptionalSlug.isPresent()) {
            throw new RuntimeException("Slug: " + dto.getSlug() + " đã được sử dụng.");
        }
        ;
        Product entity = productMapper.toEntity(dto);
//        User userId = userRepository.findById(String.valueOf(dto.getUserId())).orElse(null);
        User userId = SecurityUtils.getPrincipal();
        entity.setUsers(userId);
        entity.setCreatedAt(Instant.now());
        productRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit user
    @Transactional
    public void edit(Long id, ProductDto dto) {
        Product entity = productMapper.toEntity(dto);
        Product product = productRepository.findById(String.valueOf(id)).orElseThrow();
        if (SecurityUtils.getPrincipal() == product.getUsers()) {
            entity.setId(product.getId());
            entity.setUsers(product.getUsers());
            entity.setUpdatedAt(Instant.now());
            productRepository.save(entity);
            System.out.println("Thực thi edit");
        } else new String("Không thể edit");

    }


    // Delete user
    @Transactional
    public void delete(Long id) {
        Product product = productRepository.findById(String.valueOf(id)).orElseThrow();
        if (SecurityUtils.getPrincipal() == product.getUsers()) {
            productRepository.deleteById(String.valueOf(id));
            System.out.println("Thực thi delete");
        } else new String("Không thể xoá");

    }

    public ProductDto findProductBySlug(String slug){
        Product entity = productRepository.findProductBySlug(slug);
        ProductDto dto = productMapper.toDo(entity);
        return dto;
    }

    // get all
    public List<ProductDto> findAllProduct() {
        List<Product> entity = productRepository.findAll();
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }


//    public List<ProductDto> filter(String id , String users, String title, String keySearch, String keyOrder) {
//        List<Product> entity = productRepository.filter(id, users, title, keySearch, keyOrder);
//        List<ProductDto> dtos = productMapper.toDo(entity);
//        return dtos;

    //    public Page<ProductDto> findProductsWithPaginationAndSorting(int offset, int pageSize, String field){
//        Page<Product> products = productRepository.findAll((PageRequest.of(offset, pageSize).withSort(Sort.by(field))));
//        Page<ProductDto> dtos = products.map(productMapper::toDo);
//        return dtos;
//    }
//    public Page<ProductDto> filter(int offset, int pageSize, String field, String keySearch) {
//        Page<Product> entity = productRepository.filter(keySearch,(PageRequest.of(offset, pageSize).withSort(Sort.Direction.ASC, field)));
//        Page<ProductDto> dtos = entity.map(productMapper::toDo);
//        return dtos;
//    }
    public List<ProductDto> filter(String keySearch) {
        List<Product> entity = productRepository.filter( keySearch);
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }

    @Transactional
    public Page<ProductDto> findAllProductPage(Pageable pageable) {
        Page<Product> entities = productRepository.findAllProductPage(pageable);
        Page<ProductDto> dtoPage = entities.map(new Function<Product, ProductDto>() {
            @Override
            public ProductDto apply(Product entity) {
                ProductDto dto = new ProductDto();
                return dto;
            }
        });
        return dtoPage;
    }

    ;

    @Transactional
    public List<ProductDto> findByUsers(String title) {
        User user = SecurityUtils.getPrincipal();
        List<Product> entity = productRepository.findByUsers(user.getId(), title);
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }

    // Hiển thị list các product theo field
    public List<ProductDto> findProductsWithSorting(String field, String key) {
        List<Product> entity = productRepository.findAll(Sort.by(Sort.Direction.valueOf(key), field));
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }

    public Page<ProductDto> findProductsWithPagination(int offset, int pageSize) {
        Page<Product> products = productRepository.findAll((PageRequest.of(offset, pageSize)));
        Page<ProductDto> dtos = products.map(productMapper::toDo);
        return dtos;
    }

    public Page<ProductDto> findProductsWithPaginationAndSorting(int offset, int pageSize, String field) {
        Page<Product> products = productRepository.findAll((PageRequest.of(offset, pageSize).withSort(Sort.by(field))));
        Page<ProductDto> dtos = products.map(productMapper::toDo);
        return dtos;
    }

//    public Page<ProductDto> filterAndPagination( int offset, int pageSize, String field, String keySearch){
//        List<ProductDto> products = filter(keySearch);
//        Page<ProductDto> pageProductDtos =
//    }
}
