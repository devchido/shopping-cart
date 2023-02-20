package com.example.redstore.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
@Data
@Entity
@Table(name = "product")
public class Product {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "title", nullable = false, length = 75)
    private String title;

    @Column(name = "meta_title", length = 100)
    private String metaTitle;

    @Column(name = "slug", nullable = false, length = 100)
    private String slug;

    @Column(name = "summary")
    private String summary;

    @Column(name = "type", nullable = false)
    private Short type;

    @Column(name = "sku", nullable = false, length = 100)
    private String sku;

    @Column(name = "price", nullable = false)
    private Float price;

    @Column(name = "discount", nullable = false)
    private Float discount;

    @Column(name = "quantity", nullable = false)
    private Short quantity;

    @Column(name = "shop", nullable = false)
    private Boolean shop = false;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "published_at")
    private Instant publishedAt;

    @Column(name = "starts_at")
    private Instant startsAt;

    @Column(name = "ends_at")
    private Instant endsAt;

    @Lob
    @Column(name = "content")
    private String content;



}