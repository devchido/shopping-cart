package com.example.redstore.resources;

import com.example.redstore.domain.Cart;
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

    // Tạo item mới vào giỏ hàng cart
    /*
    {
        "productId": "2",
        "cartId": "2",
        "quantity": 1,
        "discount": "0",
        "price": 5
    }
     */
    @PostMapping("")
    public void create(@RequestBody CartItemDto dto) {
        cartItemService.create(dto);
    }

    // edit: cập nhật item của giỏ hàng
    @PutMapping("/{id}")
    public void edit(@RequestBody CartItemDto dto, @PathVariable("id") Long id) {
        cartItemService.edit(id, dto);
    }

    // delete: xoá item khỏi giỏ hàng
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        cartItemService.delete(id);
    }

    // Hiển thị tất cả các item của tất cả giỏ hàng
    @GetMapping("")
    public List<CartItemDto> findAll(){
        List<CartItemDto> dtos = cartItemService.findAll();
        return dtos;
    }
    // Hiển thị tất cả các item của giỏ hàng có id: cartId
    @GetMapping("/cart/{cartId}")
    public List<CartItemDto> findAllByCartId(@PathVariable("cartId") Long cartId){
        List<CartItemDto> dtos = cartItemService.findByCartId(cartId);
        return dtos;
    }
}
