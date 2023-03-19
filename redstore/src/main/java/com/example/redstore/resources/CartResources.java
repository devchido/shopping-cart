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

        "status": "0",
        "line1": "Hiệp Thuận",
        "city": "Hà Nội",
        "country": "VN",
        "content": "Test"
    }
     */
    @PostMapping("/auth/create")
    public void create(@RequestBody CartDto dto) {
        cartService.create(dto);
    }

    //edit giỏ hàng theo id
    @PutMapping("/auth/{id}")
    public void edit(@RequestBody CartDto dto, @PathVariable("id") Long id) {
        cartService.edit(id, dto);
    }

    // Xoá giỏ hàng
    @DeleteMapping("/auth/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        cartService.delete(id);
    }

    // Hiển thị tất cả các giỏ hàng cart
    @GetMapping("/auth")
    public List<CartDto> findAll(){
        List<CartDto> dtos = cartService.findAll();
        return dtos;
    }

    // Hiển thị các giỏ hàng cart của user có id = userID
    @GetMapping("/auth/{userId}")
    public List<CartDto> findAllByUserId(@PathVariable("userId") Long userId){
        List<CartDto> dtos = cartService.findAllByUserId(userId);
        return dtos;
    }

    // get data cart có id?
    // trong đó: id của user đăng nhập phải giống với id của user có trong thông tin của cart đó
    @GetMapping("/auth/my-cart/{id}")
    public CartDto findMyCartById(@PathVariable String id){
        CartDto dto = cartService.findMyCartById(id);
        return dto;
    }

    // get all cart - Security user
    @GetMapping("/auth/my-cart")
    public List<CartDto> findUsersCart(){
        List<CartDto> dtos = cartService.finUsersCart();
        return dtos;
    }


}
