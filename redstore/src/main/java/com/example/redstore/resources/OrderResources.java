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

    // Hiển thị các order của user
    /*
    http://localhost:8080/order/u/1
     */
    @GetMapping("/u/{users}")
    public List<OrderDto> findByUsers(@PathVariable("users") Long users){
        List<OrderDto> dtos = orderService.findByUsers(users);
        return dtos;
    }
    @GetMapping("/c/{carts}")
    public List<OrderDto> findByCarts(@PathVariable("carts") Long carts){
        List<OrderDto> dtos = orderService.findByCarts(carts);
        return dtos;
    }

    /*
    Hiển thị tất cả các order

    */
    @GetMapping("/findAll")
    public List<OrderDto> findAll(){
        List<OrderDto> dtos = orderService.findAll();
        return dtos;
    }


    /*
    http://localhost:8080/order
    {
        "cartId": "1",
        "status": "0",
        "subTotal": "0",
        "itemDiscount": "0",
        "total": "0"
    }
     */
    @PostMapping("")
    public void create(@RequestBody OrderDto dto){
        orderService.create(dto);
    }
}
