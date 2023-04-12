package com.example.redstore.projection;

import java.time.Instant;

public interface ProductInfo {
    Long getPCId();
    Long getCId();
    String getCTitle();
    String getCSlug();
    String getCContent();
    Long getPId();
    String getPTitle();
    String getPSlug();
    String getPSummary();
    String getPhotos();
    Float getPrice();
    Float getDiscount();
    Short getQuantity();
    Instant getCreatedAt();
    Instant getUpdatedAt();
    Instant getEndsAt();
    Short getStatus();
    String getContent();

}
