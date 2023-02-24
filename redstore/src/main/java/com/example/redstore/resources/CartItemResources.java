package com.example.redstore.resources;

import com.example.redstore.service.CartItemService;
import com.example.redstore.service.CartService;
import com.example.redstore.service.dto.CartDto;
import com.example.redstore.service.dto.CartItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/cart-item")
public class CartItemResources {
    private final CartItemService cartItemService;

    @PostMapping("")
    public void create(@RequestBody CartItemDto dto) {
        cartItemService.create(dto);
    }

    //edit
    @PutMapping("/{id}")
    public void edit(@RequestBody CartItemDto dto, @PathVariable("id") Long id) {
        cartItemService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        cartItemService.delete(id);
    }

    @GetMapping("")
    public List<CartItemDto> findAll(){
        List<CartItemDto> dtos = cartItemService.findAll();
        return dtos;
    }
}
