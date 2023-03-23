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


    @GetMapping("/auth/c/{carts}")
    public List<OrderDto> findByCarts(@PathVariable("carts") Long carts) {
        List<OrderDto> dtos = orderService.findByCarts(carts);
        return dtos;
    }

    // Thực hiện order cho cart ?cart={id}
    @PostMapping("/auth/createByCart")
    public void createOrderByCart(@RequestParam("idCart") Long id) {
        orderService.createOrderByCart(id);
    }


    /*
    Hiển thị tất cả các order

    */
    @GetMapping("/auth/findAll")
    public List<OrderDto> findAll() {
        List<OrderDto> dtos = orderService.findAll();
        return dtos;
    }

    /*
    Hiển thị tất cả order của user đang đăng nhập???
    http://localhost:8080/order/auth/u/1

     */
    @GetMapping("/auth/user")
    public List<OrderDto> findByUsers(@RequestParam String status) {
        List<OrderDto> dtos = orderService.findByUsers(status);
        return dtos;
    }

    @GetMapping("/auth/findOneById/{id}")
    public OrderDto findOneById(@PathVariable String id){
        OrderDto dto = orderService.findOneById(id);
        return dto;
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
    public void create(@RequestBody OrderDto dto) {
        orderService.create(dto);
    }

    /*
    User thực hiện huỷ order wit order status!= 6
     */
    @PostMapping("/auth/cancel-order")
    public void cancelOrder(@RequestParam String id){
        orderService.cancelOrder(id);
    }

}
