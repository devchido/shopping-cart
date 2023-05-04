package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.Product;
import com.example.redstore.domain.ProductReview;
import com.example.redstore.repository.ProductRepository;
import com.example.redstore.repository.ProductReviewRepository;
import com.example.redstore.service.dto.ProductReviewDto;
import com.example.redstore.service.mapper.ProductReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductRevewService {
    private final ProductReviewMapper productReviewMapper;
    private final ProductReviewRepository productReviewRepository;
    private final ProductRepository productRepository;

    public void create(ProductReviewDto dto){
        ProductReview entity = productReviewMapper.toEntity(dto);
        Product product = productRepository.findById(dto.getProductId()).orElse(null);
        entity.setProduct(product);
        entity.setUser(SecurityUtils.getPrincipal());
        entity.setPublished(0);
        entity.setCreatedAt(Instant.now());
        productReviewRepository.save(entity);
    }
    public void delete(String id){
        ProductReview entity = productReviewRepository.findById(id).orElseThrow();
        productReviewRepository.delete(entity);
    }

    public ProductReviewDto filterRatingWithUserAndProduct(Long productId){
        ProductReview entity = productReviewRepository.filterRatingWithUserAndProduct(
                SecurityUtils.getPrincipal().getId(), productId
        ).orElseThrow(()-> new RuntimeException("Bạn chưa đánh giá sản phẩm này"));
        ProductReviewDto dto = productReviewMapper.toDo(entity);
        return dto;
    }
    public List<ProductReviewDto> getAllByProduct(String productId){
        List<ProductReview> entity = productReviewRepository.findByProduct(productId);
        List<ProductReviewDto> dtos = productReviewMapper.toDo(entity);
        return dtos;
    }
}
