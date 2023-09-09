package com.example.redstore.controller;

import com.example.redstore.service.CommentService;
import com.example.redstore.dto.CommentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/api/find-by-product")
    public List<CommentDto> filterCommentByProduct(@RequestParam String productId){
        List<CommentDto> dtos = commentService.filterCommentByProduct(productId);
        return dtos;
    }
    @GetMapping("/api/filter-comment-reply")
    public List<CommentDto> filterCommentReply(@RequestParam Long productId){
        List<CommentDto> dtos = commentService.filterCommentReply(productId);
        return dtos;
    }
    // todo: tạo comment mới
    @PostMapping("/auth")
    public void create(@RequestBody CommentDto dto){
        commentService.create(dto);
    }
    // todo: xoá comment
    @DeleteMapping("/auth")
    public void delete(@RequestParam String commentId){
        commentService.delete(commentId);
    }
}
