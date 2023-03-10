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

    // Tạo giỏ hàng cart mới
    /*
    {
        "userId": "1",
        "status": "0",
        "line1": "Hiệp Thuận",
        "city": "Hà Nội",
        "country": "VN",
        "content": "Test"
    }
     */
    @PostMapping("")
    public void create(@RequestBody CartDto dto) {
        cartService.create(dto);
    }

    //edit giỏ hàng theo id
    @PutMapping("/{id}")
    public void edit(@RequestBody CartDto dto, @PathVariable("id") Long id) {
        cartService.edit(id, dto);
    }

    // Xoá giỏ hàng
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        cartService.delete(id);
    }

    // Hiển thị tất cả các giỏ hàng cart
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
