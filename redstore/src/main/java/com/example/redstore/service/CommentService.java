package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.Comment;
import com.example.redstore.domain.Product;
import com.example.redstore.repository.CategoryRepository;
import com.example.redstore.repository.CommentRepository;
import com.example.redstore.repository.ProductRepository;
import com.example.redstore.service.dto.CommentDto;
import com.example.redstore.service.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentMapper commentMapper;
    private final ProductRepository productRepository;
    private final CommentRepository commentRepository;

    public void create(CommentDto dto){
        Comment entity = commentMapper.toEntity(dto);
        entity.setCreatedAt(Instant.now());
        entity.setUser(SecurityUtils.getPrincipal());
        Product product = productRepository.findById(dto.getProductId()).orElse(null);
        entity.setProduct(product);
        commentRepository.save(entity);
    }

    public List<CommentDto> filterCommentByProduct(String productId){
        List<Comment> entity = commentRepository.filterCommentByProduct(productId);
        List<CommentDto> dtos = commentMapper.toDo(entity);
        return dtos;
    }
    public List<CommentDto> filterCommentByParentId(Long parentId){
        List<Comment> entity = commentRepository.filterCommentByParentId(parentId);
        List<CommentDto> dtos = commentMapper.toDo(entity);
        return dtos;
    }
}
