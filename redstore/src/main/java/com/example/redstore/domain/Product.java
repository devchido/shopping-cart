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
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(name = "title", nullable = false, length = 75)
    private String title;

    @Column(name = "metaTitle", length = 100)
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

    @Column(name = "createdAt", nullable = false)
    private Instant createdAt;

    @Column(name = "updatedAt")
    private Instant updatedAt;

    @Column(name = "publishedAt")
    private Instant publishedAt;

    @Column(name = "startsAt")
    private Instant startsAt;

    @Column(name = "endsAt")
    private Instant endsAt;

    @Lob
    @Column(name = "content")
    private String content;



}