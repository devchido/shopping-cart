package com.example.redstore.resources;

import com.example.redstore.service.CommentService;
import com.example.redstore.service.dto.CommentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentResources {
    private final CommentService commentService;

    @GetMapping("/api/find-by-product")
    public List<CommentDto> filterCommentByProduct(@RequestParam String productId){
        List<CommentDto> dtos = commentService.filterCommentByProduct(productId);
        return dtos;
    }
    @GetMapping("/api/find-by-parent-id")
    public List<CommentDto> filterCommentByParentId(@RequestParam Long parentId){
        List<CommentDto> dtos = commentService.filterCommentByParentId(parentId);
        return dtos;
    }
    // todo: tạo comment mới
    @PostMapping("/auth")
    public void create(@RequestBody CommentDto dto){
        commentService.create(dto);
    }
}
