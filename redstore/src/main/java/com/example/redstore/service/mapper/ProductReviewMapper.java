package com.example.redstore.service.mapper;

import com.example.redstore.domain.ProductReview;
import com.example.redstore.service.dto.ProductReviewDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class ProductReviewMapper implements EntityMapper<ProductReviewDto, ProductReview>{
    @Override
    public ProductReviewDto toDo(ProductReview productReview) {
        return null;
    }

    @Override
    public ProductReview toEntity(ProductReviewDto productReviewDto) {
        return null;
    }

    @Override
    public List<ProductReviewDto> toDo(List<ProductReview> e) {
        return null;
    }

    @Override
    public List<ProductReview> toEntity(List<ProductReviewDto> d) {
        return null;
    }
}
