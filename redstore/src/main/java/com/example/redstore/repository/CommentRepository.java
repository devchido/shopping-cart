package com.example.redstore.repository;

import com.example.redstore.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    String db = "shop";
    @Query(value = " select * from "+db+".comment where product_id = :productId order by created_at DESC ", nativeQuery = true)
    List<Comment> filterCommentByProduct(String productId);

    @Query(value = " select * from "+db+".comment where parent_id = :parentId ", nativeQuery = true)
    List<Comment> filterCommentByParentId(Long parentId);
}
