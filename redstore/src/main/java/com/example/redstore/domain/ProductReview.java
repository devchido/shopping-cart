package com.example.redstore.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "product_review")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    @Column(name = "title")
    private String title;
    @Column(name = "rating")
    private Integer rating;
    @Column(name = "published")
    private Integer published;
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
    @Column(name = "published_at")
    private Instant published_at;
    @Lob
    @Column(name = "content")
    private String content;

}
