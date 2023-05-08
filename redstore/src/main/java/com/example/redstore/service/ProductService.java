package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.*;
import com.example.redstore.projection.RatingInfo;
import com.example.redstore.repository.*;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.dto.UserDto;
import com.example.redstore.service.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
    public final ProductRepository productRepository;
    public final ProductCategoryRepository productCategoryRepository;
    public final CategoryRepository categoryRepository;
    public final ProductMapper productMapper;
    private final UserRepository userRepository;
    private final ImageProductRepository imageProductRepository;
    private final ProductReviewRepository productReviewRepository;

    // Create new user
    /*
    http://localhost:8080/product/auth/create
    {
        "title": "Áo nam",
        "slug": "ao-phong-nam-1",
        "summary": "Áo phông nam",
        "price": "200000",
        "discount": "20",
        "quantity": "10",
        "photos": "https://cf.shopee.vn/file/b04924adbab55d4b305d8b15a396a4ef",
        "content": "Áo phông dành cho nam"
    }
     */
    @Transactional
    public void create(ProductDto dto) {

        // Kiểm tra trùng lặp của  slug trong product

        Optional<Product> productOptionalSlug = productRepository.findBySlug(dto.getSlug());
        if (productOptionalSlug.isPresent()) {
            throw new RuntimeException("Slug: " + dto.getSlug() + " đã được sử dụng.");
        }
        ;
        Product entity = productMapper.toEntity(dto);
        entity.setUsers(SecurityUtils.getPrincipal());
        entity.setCreatedAt(Instant.now());
        entity.setUpdatedAt(Instant.now());
        entity.setStatus(0);
        productRepository.save(entity);
        // add category cho product
        if (dto.getCategory() != null) {
            Optional<Category> category = categoryRepository.findBySlug(dto.getCategory());
            if (category.isPresent()) {
                ProductCategory productCategory = new ProductCategory();
                productCategory.setProduct(entity);
                productCategory.setCategory(category.get());
                productCategoryRepository.save(productCategory);
                System.out.println("Thực thi thêm category cho product");
            }
        }

        System.out.println("Thực thi create");
    }

    // Edit user

    public void edit(String id, ProductDto dto) {
        Product entity = productRepository.findById(id).orElse(null);
        if (SecurityUtils.getPrincipal().getId() == entity.getUsers().getId()) {
            ImageProduct imageProduct = imageProductRepository.findByProduct(entity.getSlug()).orElseThrow(
                    () -> new RuntimeException("Không thấy ảnh")
            );
            imageProduct.setName(dto.getSlug());
            imageProductRepository.save(imageProduct);
            entity.setTitle(dto.getTitle());
            entity.setSlug(dto.getSlug());
            entity.setSummary(dto.getSummary());
            entity.setPrice(dto.getPrice());
            entity.setDiscount(dto.getDiscount());
            entity.setQuantity(dto.getQuantity());
            entity.setPhotos("/api/v1/auth/image/product/" + entity.getSlug());
            entity.setContent(dto.getContent());
            entity.setUpdatedAt(Instant.now());
            if (dto.getCategory() != null) {
                Optional<Category> category = categoryRepository.findBySlug(dto.getCategory());
                if (category.isPresent()) {
                    ProductCategory check = productCategoryRepository.findByProductId(entity.getId()).orElse(null);
                    if (check != null) {
                        check.setCategory(category.get());
                        productCategoryRepository.save(check);
                        System.out.println("thay đổi category cho product có id= " + entity.getId());
                    } else {

                        ProductCategory productCategory = new ProductCategory();
                        productCategory.setProduct(entity);
                        productCategory.setCategory(category.get());
                        productCategoryRepository.save(productCategory);
                        System.out.println("Thực thi thêm category cho product có id= " + entity.getId());
                    }
                }
            }

            productRepository.save(entity);
            System.out.println("Thực thi edit");
        } else new String("Không thể edit");

    }


    // Delete user
    @Transactional
    public void delete(Long id) {
        Product product = productRepository.findById(String.valueOf(id)).orElseThrow();
        if (SecurityUtils.getPrincipal().getId() == product.getUsers().getId()) {
            productRepository.deleteById(String.valueOf(id));
            System.out.println("Thực thi delete");
        } else new String("Không thể xoá");

    }

    public ProductDto findByProductId(String id) {
        Product entity = productRepository.findById(id).orElse(null);
        ProductDto dto = productMapper.toDo(entity);
//        Optional<ProductCategory> productCategory = productCategoryRepository.findByProductId(entity.getId());
//        if (productCategory.isPresent()) {
//            dto.setCategory(String.valueOf(productCategory.get().getId()));
//        }
        return dto;
    }

    public ProductDto findProductBySlug(String slug) {
        Product entity = productRepository.findProductBySlug(slug);
        ProductDto dto = productMapper.toDo(entity);
        Category category = categoryRepository.singleProductCategory(slug).orElse(null);
        if (category != null) {
            dto.setCategory(category.getTitle());
        }

        RatingInfo ratingInfo = productReviewRepository.ratingAvgByProduct(entity.getId());
        dto.setRating(ratingInfo);
        return dto;
    }

    // get all product with status = 1
    public List<ProductDto> findAllProduct() {
        List<Product> entity = productRepository.findProductByStatus();
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }


//    public List<ProductDto> filter(String id , String users, String title, String keySearch, String keyOrder) {
//        List<Product> entity = productRepository.filter(id, users, title, keySearch, keyOrder);
//        List<ProductDto> dtos = productMapper.toDo(entity);
//        return dtos;

    //    public Page<ProductDto> findProductsWithPaginationAndSorting(int offset, int pageSize, String field){
//        Page<Product> products = productRepository.findAll((PageRequest.of(offset, pageSize).withSort(Sort.by(field))));
//        Page<ProductDto> dtos = products.map(productMapper::toDo);
//        return dtos;
//    }
//    public Page<ProductDto> filter(int offset, int pageSize, String field, String keySearch) {
//        Page<Product> entity = productRepository.filter(keySearch,(PageRequest.of(offset, pageSize).withSort(Sort.Direction.ASC, field)));
//        Page<ProductDto> dtos = entity.map(productMapper::toDo);
//        return dtos;
//    }
    public List<ProductDto> filter(String keySearch) {
        List<Product> entity = productRepository.filter(keySearch);
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }

    @Transactional
    public List<ProductDto> findByUsers(String title) {
        User user = SecurityUtils.getPrincipal();
        List<Product> entity = productRepository.findByUsers(user.getId(), title);
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }

    // Hiển thị list các product theo field
    public List<ProductDto> findProductsWithSorting(String field, String key) {
        List<Product> entity = productRepository.findAll(Sort.by(Sort.Direction.valueOf(key), field));
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }

    public Page<ProductDto> findProductsWithPagination(int offset, int pageSize) {
        Page<Product> products = productRepository.findAll((PageRequest.of(offset, pageSize)));
        Page<ProductDto> dtos = products.map(productMapper::toDo);
        return dtos;
    }

//    public Page<ProductDto> findProductsWithPaginationAndSorting(int offset, int pageSize, String field) {
//        Page<Product> products = productRepository.findAll((PageRequest.of(offset, pageSize).withSort(Sort.by(Sort.Direction.DESC,field))));
//        Page<ProductDto> dtos = products.map(productMapper::toDo);
//        return dtos;
//    }

    // todo: findProductsWithPaginationAndSorting - lọc tất cả các product được đăng bán ở dạng page
    public Page<ProductDto> findProductsWithPaginationAndSorting(String title, int offset, int pageSize, String field) {
        Page<Product> products = productRepository.findAllProductPage(title, (PageRequest.of(offset, pageSize).withSort(Sort.by(Sort.Direction.DESC, field))));
        Page<ProductDto> dtos = products.map(productMapper::toDo);
        return dtos;
    }

    // todo: filterUsersProducts - lọc tất cả các product của user đang đăng nhập ở dạng page
    public Page<ProductDto> filterUsersProducts(String title, int offset, int pageSize, String field, String status, String sort) {
        Page<Product> products = productRepository.filterUsersProducts(title,
                (PageRequest.of(offset, pageSize).withSort(Sort.by(Sort.Direction.valueOf(sort), field))),

                String.valueOf(SecurityUtils.getPrincipal().getId()), status);
        Page<ProductDto> dtos = products.map(productMapper::toDo);
        return dtos;
    }

    // todo: filterAllProducts - lọc tất cả các product ở dạng page
    public Page<ProductDto> filterAllProducts(int offset, int pageSize, String field, String sort,
                                              String username, String ptitle, String ctitle, String status, String vendor) {
        Page<Product> products = productRepository.filterAllProducts(
                (PageRequest.of(offset, pageSize).withSort(Sort.by(Sort.Direction.valueOf(sort), field))),
                username, ptitle, ctitle, status, vendor
        );
        Page<ProductDto> dtos = products.map(productMapper::toDo);
        return dtos;
    }

    /* test
    public Page<ProductDto> findProductsWithPaginationAndSorting(int offset, int pageSize, String field) {
        Page<Product> products = productRepository.findAll((PageRequest.of(offset, pageSize).withSort(Sort.by(field))));
        Page<ProductDto> dtos = products.map(productMapper::toDo);
        return dtos;
    }
     */

    public List<ProductDto> filterProduct(String sort, String field) {
        List<Product> entity = productRepository.findAll(Sort.by(Sort.Direction.valueOf(sort), field));
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }

    public void setStatusProduct(String id, int status) {
        Product entity = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm!"));
        if (status == 0) {
            entity.setStatus(0);
            productRepository.save(entity);
            System.out.println("Ẩn product");
        }
        ;
        if (status == 1) {
            entity.setStatus(1);
            productRepository.save(entity);
            System.out.println("Xác nhận sản phẩm");
        }
        ;
        if (status == 2) {
            entity.setStatus(2);
            productRepository.save(entity);
            System.out.println("Kiểm duyệt sản phẩm");
        }
        ;
        if (status == 3) {
            entity.setStatus(3);
            productRepository.save(entity);
            System.out.println("Ngừng bán sản phẩm");
        }

    }

    public List<ProductDto> lastestProduct(String field) {
        List<Product> entity = productRepository.lastestProduct(field);
        List<ProductDto> dtos = productMapper.toDo(entity);
        return dtos;
    }


}
