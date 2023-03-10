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
    http://localhost:8080/order/auth/u/1
     */
    @GetMapping("/auth/u/{users}")
    public List<OrderDto> findByUsers(@PathVariable("users") Long users){
        List<OrderDto> dtos = orderService.findByUsers(users);
        return dtos;
    }
    @GetMapping("/auth/c/{carts}")
    public List<OrderDto> findByCarts(@PathVariable("carts") Long carts){
        List<OrderDto> dtos = orderService.findByCarts(carts);
        return dtos;
    }
    // Thực hiện order cho cart ?cart={id}
    @PostMapping("/auth/createByCart")
    public void createOrderByCart(@RequestParam("idCard") Long id) {
        orderService.createOrderByCart(id);
    }


    /*
    Hiển thị tất cả các order

    */
    @GetMapping("/auth/findAll")
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
    @PostMapping("/auth/create")
    public void create(@RequestBody OrderDto dto){
        orderService.create(dto);
    }
}
