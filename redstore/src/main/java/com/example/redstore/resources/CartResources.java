package com.example.redstore.resources;

import com.example.redstore.service.CartService;
import com.example.redstore.service.ProductService;
import com.example.redstore.service.dto.CartDto;
import com.example.redstore.service.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartResources {
    private final CartService cartService;

    @PostMapping("")
    public void create(@RequestBody CartDto dto) {
        cartService.create(dto);
    }

    //edit
    @PutMapping("/{id}")
    public void edit(@RequestBody CartDto dto, @PathVariable("id") Long id) {
        cartService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        cartService.delete(id);
    }

    @GetMapping("")
    public List<CartDto> findAll(){
        List<CartDto> dtos = cartService.findAll();
        return dtos;
    }

    // Hiển thị các giỏ hàng cart của user có id = userID
    @GetMapping("/user/{userId}")
    public List<CartDto> findAllByUserId(@PathVariable("userId") Long userId){
        List<CartDto> dtos = cartService.findAllByUserId(userId);
        return dtos;
    }
}
