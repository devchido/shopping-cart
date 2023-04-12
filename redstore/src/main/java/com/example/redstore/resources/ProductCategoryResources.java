package com.example.redstore.resources;

import com.example.redstore.projection.ProductInfo;
import com.example.redstore.service.CategoryService;
import com.example.redstore.service.ProductCategoryService;
import com.example.redstore.service.dto.APIResponse;
import com.example.redstore.service.dto.CategoryDto;
import com.example.redstore.service.dto.ProductCategoryDto;
import com.example.redstore.service.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/product-category")
public class ProductCategoryResources {
    private final ProductCategoryService productCategoryService;

    @PostMapping("/auth/create")
    public void create(@RequestBody ProductCategoryDto dto) {
        productCategoryService.create(dto);
    }

    //edit
    @PutMapping("/auth/update/{id}")
    public void edit(@RequestBody ProductCategoryDto dto, @PathVariable("id") Long id) {
        productCategoryService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/auth/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        productCategoryService.delete(id);
    }

    @GetMapping("/api/find-all")
    public List<ProductCategoryDto> findAll() {
        List<ProductCategoryDto> dtos = productCategoryService.findAll();
        return dtos;
    }

    @GetMapping("/api/{productId}")
    public ProductCategoryDto findByProductId(@PathVariable Long productId) {
        ProductCategoryDto dto = productCategoryService.findByProductId(productId);
        return dto;
    }

    //
    @GetMapping("/auth/admin/{offset}/{pageSize}/{field}")
    private APIResponse<Page<ProductCategoryDto>> filterAllProduct(
            @RequestParam(value = "title", defaultValue = "") String title,
            @PathVariable int offset,
            @PathVariable int pageSize,
            @PathVariable String field,
            @RequestParam(value = "status", defaultValue = "") String status,
            @RequestParam(value = "category", defaultValue = "") String category,
            @RequestParam String sort) {
        Page<ProductCategoryDto> dtos = productCategoryService.filterAllProduct(
                title, offset, pageSize, field, status, category, sort
        );
        return new APIResponse<>(dtos.getSize(), dtos);
    }

}
