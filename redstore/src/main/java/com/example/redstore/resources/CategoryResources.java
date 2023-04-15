package com.example.redstore.resources;

import com.example.redstore.repository.CategoryRepository;
import com.example.redstore.service.CategoryService;
import com.example.redstore.service.ProductService;
import com.example.redstore.service.dto.APIResponse;
import com.example.redstore.service.dto.CategoryDto;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryResources {

    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;

    @PostMapping("/auth/admin")
    public void create(@RequestBody CategoryDto dto) {
        categoryService.create(dto);
    }

    //edit
    @PutMapping("/auth/admin/{id}")
    public void edit(@RequestBody CategoryDto dto, @PathVariable("id") Long id) {
        categoryService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/auth/admin")
    public void delete(@RequestParam("id") Long id) {
        categoryService.delete(id);
    }

    @GetMapping("/api")
    public List<CategoryDto> findAll(){
        List<CategoryDto> dtos = categoryService.findAll();
        return dtos;
    }
    @GetMapping("/api/filter")
    public List<CategoryDto> filter(@RequestParam String title){
        List<CategoryDto> dtos = categoryService.filter(title);
        return dtos;
    }
    @GetMapping("/api/single-product-category")
    public CategoryDto singleProductCategory(@RequestParam String field){
        CategoryDto dto = categoryService.singleProductCategory(field);
        return dto;
    }
    // todo: findAllCategory
    @GetMapping("/auth/admin/{offset}/{pageSize}")
    private APIResponse<Page<CategoryDto>> findAllCategory(
            @PathVariable int offset,
            @PathVariable int pageSize,
            @RequestParam(value = "field", defaultValue = "id") String field,
            @RequestParam(value = "sort", defaultValue = "ASC") String sort,
            @RequestParam(value = "title", defaultValue = "") String title
    ) {
        Page<CategoryDto> dtos = categoryService.findAllCategory(
                offset, pageSize, field, sort, title
        );
        return new APIResponse<>(dtos.getSize(), dtos);
    }
    // todo: findCategoryById
    @GetMapping("/api/{id}")
    private CategoryDto findCategoryById(@PathVariable String id){
        CategoryDto dto = categoryService.findById(id);
        return dto;
    }
}
