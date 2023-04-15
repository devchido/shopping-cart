package com.example.redstore.resources;

import com.example.redstore.repository.ProductRepository;
import com.example.redstore.service.OrderService;
import com.example.redstore.service.ProductService;
import com.example.redstore.service.dto.APIResponse;
import com.example.redstore.service.dto.OrderDto;
import com.example.redstore.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

    // Thực hiện order cho cart ?idCart={id}
    @PostMapping("/auth/createByCart")
    public void createOrderByCart(@RequestParam("idCart") Long id) {
        orderService.createOrderByCart(id);
    }


    /*
    Hiển thị tất cả các order

    */
    @GetMapping("/auth/admin/filter")
    public List<OrderDto> filter(@RequestParam String status) {
        List<OrderDto> dtos = orderService.filter(status);
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
    // todo: user đăng nhập thực hiện get data order của mình
    @GetMapping("/auth/findOneById/{id}")
    public OrderDto findOneById(@PathVariable String id){
        OrderDto dto = orderService.findOneById(id);
        return dto;
    }
    // todo: admin thực hiện get data order
    @GetMapping("/auth/admin/p/{id}")
    public OrderDto findById(@PathVariable String id){
        OrderDto dto = orderService.findById(id);
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
    @PutMapping("/auth/cancel-order")
    public void cancelOrder(@RequestParam String id){
        orderService.cancelOrder(id);
    }
    /*
    Thực hiện xác nhận order -> vận chuyển
     */
    @PutMapping("/auth/admin/confirm-order")
    public void confirmOrder(@RequestParam String id, @RequestParam int status){
        orderService.confirmOrder(id, status);
    }
    // todo: findAllOrder
    @GetMapping("/auth/admin/{offset}/{pageSize}")
    private APIResponse<Page<OrderDto>> findAllOrder(
            @PathVariable int offset,
            @PathVariable int pageSize,
            @RequestParam String field,
            @RequestParam String sort,
            @RequestParam String cartId,
            @RequestParam String userId,
            @RequestParam String username,
            @RequestParam String mobile,
            @RequestParam String email,
            @RequestParam String address,
            @RequestParam String city,
            @RequestParam String country,
            @RequestParam String status
    ) {
        Page<OrderDto> dtos = orderService.findAllOrder(
                offset, pageSize, field, sort, cartId, userId, username, mobile, email, address, city, country, status
        );
        return new APIResponse<>(dtos.getSize(), dtos);
    }

}
