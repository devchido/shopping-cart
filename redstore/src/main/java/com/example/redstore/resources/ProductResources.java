package com.example.redstore.resources;

import com.example.redstore.service.ProductService;
import com.example.redstore.service.UserService;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductResources {

    private final ProductService productService;

    @PostMapping("")
    public void create(@RequestBody ProductDto dto) {
        productService.create(dto);
    }

    //edit
    @PutMapping("/{id}")
    public void edit(@RequestBody ProductDto dto, @PathVariable("id") Long id) {
        productService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        productService.delete(id);
    }

    @GetMapping("")
    public List<ProductDto> findAll(){
        List<ProductDto> dtos = productService.findAll();
        return dtos;
    }
}
