package com.example.redstore.resources;

import com.example.redstore.service.CartItemService;
import com.example.redstore.service.OrderItemService;
import com.example.redstore.service.dto.CartItemDto;
import com.example.redstore.service.dto.OrderItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/order-item")
public class OrderItemResources {
    private final OrderItemService orderItemService;

    @PostMapping("")
    public void create(@RequestBody OrderItemDto dto) {
        orderItemService.create(dto);
    }

    //edit
    @PutMapping("/{id}")
    public void edit(@RequestBody OrderItemDto dto, @PathVariable("id") Long id) {
        orderItemService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        orderItemService.delete(id);
    }

    @GetMapping("")
    public List<OrderItemDto> findAll(){
        List<OrderItemDto> dtos = orderItemService.findAll();
        return dtos;
    }
}
