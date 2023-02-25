package com.example.redstore.resources;

import com.example.redstore.service.OrderItemService;
import com.example.redstore.service.TransactionService;
import com.example.redstore.service.dto.OrderItemDto;
import com.example.redstore.service.dto.TransactionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/transaction")
public class TransactionResources {
    private final TransactionService transactionService;

    @PostMapping("")
    public void create(@RequestBody TransactionDto dto) {
        transactionService.create(dto);
    }

    //edit
    @PutMapping("/{id}")
    public void edit(@RequestBody TransactionDto dto, @PathVariable("id") Long id) {
        transactionService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        transactionService.delete(id);
    }

    @GetMapping("")
    public List<TransactionDto> findAll(){
        List<TransactionDto> dtos = transactionService.findAll();
        return dtos;
    }
}
