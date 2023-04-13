package com.example.redstore.resources;

import com.example.redstore.service.OrderItemService;
import com.example.redstore.service.TransactionService;
import com.example.redstore.service.dto.APIResponse;
import com.example.redstore.service.dto.OrderDto;
import com.example.redstore.service.dto.OrderItemDto;
import com.example.redstore.service.dto.TransactionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/transaction")
public class TransactionResources {
    private final TransactionService transactionService;

    @PostMapping("/auth/create")
    public void create(@RequestBody TransactionDto dto) {
        transactionService.create(dto);
    }

    //edit
    @PutMapping("/auth/update/{id}")
    public void edit(@RequestBody TransactionDto dto, @PathVariable("id") Long id) {
        transactionService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/auth/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        transactionService.delete(id);
    }

    @GetMapping("/auth/admin")
    public List<TransactionDto> findAll(@RequestParam("field") String field){
        List<TransactionDto> dtos = transactionService.findAll(field);
        return dtos;
    }
    @GetMapping("/auth/u/{userId}")
    public TransactionDto findByUserId(@PathVariable String userId){
        TransactionDto dto = transactionService.findByUserId(userId);
        return dto;
    }
    // todo: findAllTransaction
    @GetMapping("/auth/admin/{offset}/{pageSize}")
    private APIResponse<Page<TransactionDto>> findAllTransaction(
            @PathVariable int offset,
            @PathVariable int pageSize,
            @RequestParam String field,
            @RequestParam String sort,
            @RequestParam String userId,
            @RequestParam String orderId,
            @RequestParam String username,
            @RequestParam String mobile,
            @RequestParam String email,
            @RequestParam String address,
            @RequestParam String city,
            @RequestParam String country,
            @RequestParam String type,
            @RequestParam String mode,
            @RequestParam String status
    ) {
        Page<TransactionDto> dtos = transactionService.findAllTransaction(
                offset, pageSize, field, sort,
                userId, orderId, username, mobile, email, address, city, country, type, mode, status
        );
        return new APIResponse<>(dtos.getSize(), dtos);
    }
}
