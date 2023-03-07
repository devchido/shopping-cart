package com.example.redstore.resources;

import com.example.redstore.repository.ProductRepository;
import com.example.redstore.service.OrderService;
import com.example.redstore.service.ProductService;
import com.example.redstore.service.dto.OrderDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderResources {

    private final OrderService orderService;

    @GetMapping("/{users}")
    public List<OrderDto> findByUsers(@PathVariable("users") Long users){
        List<OrderDto> dtos = orderService.findByUsers(users);
        return dtos;
    }
}
