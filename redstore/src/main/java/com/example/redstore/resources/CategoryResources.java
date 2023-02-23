package com.example.redstore.resources;

import com.example.redstore.service.CategoryService;
import com.example.redstore.service.ProductService;
import com.example.redstore.service.dto.CategoryDto;
import com.example.redstore.service.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryResources {

    private final CategoryService categoryService;

    @PostMapping("")
    public void create(@RequestBody CategoryDto dto) {
        categoryService.create(dto);
    }

    //edit
    @PutMapping("/{id}")
    public void edit(@RequestBody CategoryDto dto, @PathVariable("id") Long id) {
        categoryService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        categoryService.delete(id);
    }

    @GetMapping("")
    public List<CategoryDto> findAll(){
        List<CategoryDto> dtos = categoryService.findAll();
        return dtos;
    }
}
