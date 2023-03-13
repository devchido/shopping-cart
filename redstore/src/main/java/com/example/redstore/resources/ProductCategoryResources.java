package com.example.redstore.resources;

import com.example.redstore.service.CategoryService;
import com.example.redstore.service.ProductCategoryService;
import com.example.redstore.service.dto.CategoryDto;
import com.example.redstore.service.dto.ProductCategoryDto;
import lombok.RequiredArgsConstructor;
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
    public List<ProductCategoryDto> findAll(){
        List<ProductCategoryDto> dtos = productCategoryService.findAll();
        return dtos;
    }
}
