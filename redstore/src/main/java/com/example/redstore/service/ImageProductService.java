package com.example.redstore.service;

import com.example.redstore.domain.ImageProduct;
import com.example.redstore.domain.Product;
import com.example.redstore.repository.ImageProductRepository;
import com.example.redstore.repository.ProductRepository;
import com.example.redstore.util.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ImageProductService {
    @Autowired
    private ImageProductRepository imageProductRepository;
    private final ProductRepository productRepository;

    public String uploadImage(MultipartFile file, String slug) throws IOException {
        ImageProduct entity = imageProductRepository
                .findByProduct(slug)
                .orElse(null);

        Product product = productRepository.findBySlug(slug).orElseThrow(
                ()-> new RuntimeException("không tìm thấy product"));

        if (entity == null) {
            System.out.println("chưa có ảnh");
            ImageProduct imageProduct = imageProductRepository.save(ImageProduct.builder()
                    .name(slug)
                    .product(product)
                    .type(file.getContentType())
                    .imageData(ImageUtils.compressImage(file.getBytes())).build());
            if (imageProduct != null) {
                product.setPhotos("/api/v1/auth/image/product/" + imageProduct.getName());
                return "file uploaded successfully : " + imageProduct.getName();
            }
        } else {
            System.out.println("đã có ảnh");
            entity.setImageData(ImageUtils.compressImage(file.getBytes()));
            entity.setType(file.getContentType());
            product.setPhotos("/api/v1/auth/image/product/" + slug);
            return "file uploaded successfully : " + entity.getName();
        }
        return null;
    }

    public byte[] downloadImage(String fileName) {
        Optional<ImageProduct> dbImageData = imageProductRepository.findByName(fileName);
        byte[] images = ImageUtils.decompressImage(dbImageData.get().getImageData());
        return images;
    }
}
