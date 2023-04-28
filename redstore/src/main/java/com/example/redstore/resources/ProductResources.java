package com.example.redstore.resources;

import com.example.redstore.service.ImageProductService;
import com.example.redstore.service.ProductService;
import com.example.redstore.service.UserService;
import com.example.redstore.service.dto.APIResponse;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductResources {

    private final ProductService productService;
    private final ImageProductService imageProductService;

    /*
    user đăng nhập thực hiện tạo sản phẩm mới
    http://localhost:8080/product/auth/create
    {
        "title": "GIÀY SNEAKER CHỐNG BÁM NƯỚC",
        "slug": "giay-sneaker-chong-tham-nuoc",
        "summary": "GIÀY SNEAKER CHỐNG BÁM NƯỚC - LESS TIRING 28.5cm ĐEN",
        "price": "599000",
        "discount": "10",
        "quantity": "300",
        "photos": "https://img.muji.net/img/item/4550344414453_1260.jpg",
        "content": "Sản phẩm sử dụng vải cotton chống bám nước, có thiết kế hỗ trợ chuyển động của chân."
    }
     */
    @PostMapping("/auth")
    public void create(@RequestBody ProductDto dto) {
        productService.create(dto);
    }

    //edit by id
    /*
    Người dùng thực hiện thay đổi thông tin sản phẩm họ đăng bán
    {
        "title": "Áo nam",
        "slug": "ao-phong-nam-1",
        "summary": "Áo phông nam",
        "price": 200000.0,
        "discount": 20.0,
        "photos": "https://cf.shopee.vn/file/b04924adbab55d4b305d8b15a396a4ef",
        "quantity": 50,
        "updatedAt": null,
        "endsAt": null,
        "content": "Áo phông dành cho nam"
    }
     */
    @PutMapping("/auth/{id}")
    public void edit(@PathVariable String id, @RequestBody ProductDto dto) {
        productService.edit(id, dto);
    }

    /*
    find product by id
     */
    @GetMapping("/auth/{id}")
    public ProductDto findByProductId(@PathVariable String id) {
        ProductDto dto = productService.findByProductId(id);
        return dto;
    }

    //delete by id
    @DeleteMapping("/auth/{id}")
    public void delete(@PathVariable("id") Long id) {
        productService.delete(id);
    }

    @GetMapping("/api/find-all-product")
    public List<ProductDto> findAllProduct() {
        List<ProductDto> dtos = productService.findAllProduct();
        return dtos;
    }


    @GetMapping("/api/filter")
    public List<ProductDto> filter(@RequestParam(defaultValue = "") String keySearch) {
        List<ProductDto> dtos = productService.filter(keySearch);
        return dtos;
    }


    @GetMapping("/auth/user")
    public List<ProductDto> findByUsers(@RequestParam(value = "") String title) {
        List<ProductDto> dtos = productService.findByUsers(title);
        return dtos;
    }

    // todo: filterUsersProducts - user lọc tất cả các product của mình ở dạng page
    @GetMapping("/auth/user/{offset}/{pageSize}/{field}")
    private APIResponse<Page<ProductDto>> filterUsersProducts(
            @RequestParam(value = "title", defaultValue = "") String title,
            @PathVariable int offset,
            @PathVariable int pageSize,
            @PathVariable String field,
            @RequestParam(value = "status", defaultValue = "") String status,
            @RequestParam String sort) {
        Page<ProductDto> dtos = productService.filterUsersProducts(title, offset, pageSize, field, status, sort);
        return new APIResponse<>(dtos.getSize(), dtos);
    }

    // todo: filterAllProducts - admin lọc tất cả các product ở dạng page
    @GetMapping("/auth/admin/{offset}/{pageSize}")
    private APIResponse<Page<ProductDto>> filterAllProducts(
            @PathVariable int offset,
            @PathVariable int pageSize,
            @RequestParam String field,
            @RequestParam String sort,
            @RequestParam String username,
            @RequestParam String ptitle,
            @RequestParam String ctitle,
            @RequestParam String status,
            @RequestParam String vendor

            ) {
        Page<ProductDto> dtos = productService.filterAllProducts(offset, pageSize, field, sort,
                username, ptitle, ctitle, status,vendor);
        return new APIResponse<>(dtos.getSize(), dtos);
    }


    //Tesst page
    @GetMapping("/api/page")
    private APIResponse<List<ProductDto>> getProduct() {
        List<ProductDto> dtos = productService.findAllProduct();
        return new APIResponse<>(dtos.size(), dtos);
    }

    @GetMapping("/api/{field}/{key}")
    private APIResponse<List<ProductDto>> getProductsWithSort(@PathVariable String field, @PathVariable String key) {
        List<ProductDto> dtos = productService.findProductsWithSorting(field, key);
        return new APIResponse<>(dtos.size(), dtos);
    }

    @GetMapping("/api/pagination/{offset}/{pageSize}")
    private APIResponse<Page<ProductDto>> getProductsWithPagination(@PathVariable int offset, @PathVariable int pageSize) {
        Page<ProductDto> dtos = productService.findProductsWithPagination(offset, pageSize);
        return new APIResponse<>(dtos.getSize(), dtos);
    }
    // get page api not filter: chỉ get all
//    @GetMapping("/api/paginationAndSort/{offset}/{pageSize}/{field}")
//    private APIResponse<Page<ProductDto>> getProductsWithPaginationAndSort(@PathVariable int offset, @PathVariable int pageSize, @PathVariable String field){
//        Page<ProductDto> dtos = productService.findProductsWithPaginationAndSorting(offset, pageSize, field);
//        return new APIResponse<>(dtos.getSize(), dtos);
//    }

    // todo: test page

    @GetMapping("/api/paginationAndSort/{offset}/{pageSize}/{field}")
    private APIResponse<Page<ProductDto>> getProductsWithPaginationAndSort(
            @RequestParam(value = "title", defaultValue = "") String title,
            @PathVariable int offset,
            @PathVariable int pageSize,
            @PathVariable String field) {
        Page<ProductDto> dtos = productService.findProductsWithPaginationAndSorting(title, offset, pageSize, field);
        return new APIResponse<>(dtos.getSize(), dtos);
    }


    //
    @GetMapping("/api/findProductBySlug/{slug}")
    public ProductDto findProductBySlug(@PathVariable String slug) {
        ProductDto dto = productService.findProductBySlug(slug);
        return dto;
    }

    /*
    /product/auth/admin/filter?sort={column}&field={Direction: phương hướng}
     */
    @GetMapping("/auth/admin/filter")
    public List<ProductDto> filterProduct(@RequestParam String sort, @RequestParam String field) {
        List<ProductDto> dtos = productService.filterProduct(sort, field);
        return dtos;
    }

    // Quản lý trạng thái status của các product:
    @PutMapping("/auth/admin/setStatus")
    public void setStatusProduct(@RequestParam("id") String id, @RequestParam("status") int status) {
        productService.setStatusProduct(id, status);
    }

    // sản phẩm mới nhất
    @GetMapping("/api/lastest-product")
    public List<ProductDto> lastestProduct(@RequestParam String field) {
        List<ProductDto> dtos = productService.lastestProduct(field);
        return dtos;
    }
    // todo: upload image
    @PostMapping("/auth/image")
    public ResponseEntity<?> uploadImage(
            @RequestParam("image") MultipartFile file, @RequestParam("slug") String slug)
            throws IOException {
        String uploadImage = imageProductService.uploadImage(file, slug);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/auth/image/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName) {
        byte[] imageData = imageProductService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }
}
