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
    @DeleteMapping("/auth/admin/{id}")
    public void delete(@PathVariable("id") String id) {
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
    @GetMapping("/auth/{id}")
    public TransactionDto findTransactionById(@PathVariable String id){
        TransactionDto dto = transactionService.findTransactionById(id);
        return dto;
    }
    @GetMapping("/auth/admin/{id}")
    public TransactionDto findById(@PathVariable String id){
        TransactionDto dto = transactionService.findById(id);
        return dto;
    }
    // todo: user tìm đến transaction thông qua orderId
    @GetMapping("/auth/order/{orderId}")
    public TransactionDto findByOrderId(@PathVariable Long orderId){
        TransactionDto dto = transactionService.findByOrderId(orderId);
        return dto;
    }

    // todo: admin tìm đến transaction thông qua orderId
    @GetMapping("/auth/admin/order/{orderId}")
    public TransactionDto adminFindByOrderId(@PathVariable Long orderId){
        TransactionDto dto = transactionService.adminFindByOrderId(orderId);
        return dto;
    }
    // todo: user thanh toán giao dịch 0 -> 1
    @PutMapping("/auth/{id}")
    public void paymentUser(@PathVariable String id){
        transactionService.paymentUser(id);
    }
    // todo: admin xác nhận thanh toán cho giao dịch 0 -> 1
    @PutMapping("/auth/admin/{id}")
    public void paymentAdmin(@PathVariable String id){
        transactionService.paymentAdmin(id);
    }
    // todo: user xác nhận đã hoàn trả giao dịch
    @PutMapping("/auth/refunded/{id}")
    public void refundedTransaction(@PathVariable String id){
        transactionService.refundedTransaction(id);
    }
}
