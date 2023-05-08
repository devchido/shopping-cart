package com.example.redstore.resources;

import com.example.redstore.service.ProductRevewService;
import com.example.redstore.service.dto.ProductReviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/product-review")
public class ProductReviewResources {
    private final ProductRevewService productRevewService;

    // todo: tạo đánh giá mới
    @PostMapping("/auth/create")
    public void create(@RequestBody ProductReviewDto dto){
        productRevewService.create(dto);
    }

    // todo: xoá đánh giá
    @DeleteMapping("/auth/delete")
    public void delete(@RequestParam String id){
        productRevewService.delete(id);
    }

    // todo: hiển thị đánh giá của người dùng đang đăng nhập đối với sản phẩm cần xem
    @GetMapping("/auth/product")
    public ProductReviewDto filterRatingWithUserAndProduct(@RequestParam Long productId){
        return productRevewService.filterRatingWithUserAndProduct(productId);
    }

    // todo: hiển thị tất cả đánh giá đối với sản phầm cần xem
    @GetMapping("/api/product")
    public List<ProductReviewDto> getAllByProduct(@RequestParam String productId){
        return productRevewService.getAllByProduct(productId);
    }
}
