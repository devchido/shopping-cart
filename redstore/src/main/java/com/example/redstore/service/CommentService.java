package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.Comment;
import com.example.redstore.domain.Product;
import com.example.redstore.repository.CommentRepository;
import com.example.redstore.repository.ProductRepository;
import com.example.redstore.dto.CommentDto;
import com.example.redstore.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
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

    public void create(CommentDto dto) {
        Comment entity = commentMapper.toEntity(dto);
        entity.setCreatedAt(Instant.now());
        entity.setUser(SecurityUtils.getPrincipal());
        Product product = productRepository.findById(dto.getProductId()).orElse(null);
        entity.setProduct(product);
        commentRepository.save(entity);
    }

    public void delete(String commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();

        List<Comment> commentReply = commentRepository.findByParentId(commentId);
        if (commentReply.toArray().length > 0) {
            commentReply.forEach(comment1 -> {
                commentRepository.delete(comment1);
                System.out.println("xoá các bình luận đã phản hồi");
            });
        };
        commentRepository.delete(comment);
        System.out.println("xoá comment");

    }

    public List<CommentDto> filterCommentByProduct(String productId) {
        List<Comment> entity = commentRepository.filterCommentByProduct(productId);
        List<CommentDto> dtos = commentMapper.toDo(entity);
        return dtos;
    }

    public List<CommentDto> filterCommentReply(Long productId) {
        List<Comment> entity = commentRepository.filterCommentReply(productId);
        List<CommentDto> dtos = commentMapper.toDo(entity);
        System.out.println("comment reply");
        return dtos;
    }
}
