package com.example.redstore.resources;

import com.example.redstore.service.ProductService;
import com.example.redstore.service.UserService;
import com.example.redstore.service.dto.APIResponse;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductResources {

    private final ProductService productService;

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
    @PostMapping("/auth/create")
    public void create(@RequestBody ProductDto dto) {
        productService.create(dto);
    }

    //edit
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
    @PutMapping("/auth/edit/{id}")
    public void edit(@PathVariable String id,@RequestBody ProductDto dto) {
        productService.edit(id, dto);
    }
    /*
    Hiển thị tất cả product của người dùng có id 1
    http://localhost:8080/product/auth/1
     */
    @PostMapping("/auth/{id}")
    public ProductDto findByProductId(@PathVariable String id){
        ProductDto dto = productService.findByProductId(id);
        return dto;
    }

    //delete
    @DeleteMapping("/auth/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        productService.delete(id);
    }

    @GetMapping("/api/find-all-product")
    public List<ProductDto> findAllProduct() {
        List<ProductDto> dtos = productService.findAllProduct();
        return dtos;
    }



    @GetMapping("/api/filter")
    public List<ProductDto> filter(@RequestParam(defaultValue = "") String keySearch){
        List<ProductDto> dtos = productService.filter(keySearch);
        return dtos;
    }
//    @GetMapping("/paginationAndSort/{offset}/{pageSize}/{field}")
//    private APIResponse<Page<ProductDto>> getProductsWithPaginationAndSort(@PathVariable int offset, @PathVariable int pageSize, @PathVariable String field){
//        Page<ProductDto> dtos = productService.findProductsWithPaginationAndSorting(offset, pageSize, field);
//        return new APIResponse<>(dtos.getSize(), dtos);
//    }
    @PostMapping("/auth/user")
    public List<ProductDto> findByUsers(@RequestParam(value = "") String title){
        List<ProductDto> dtos = productService.findByUsers(title);
        return dtos;
    }


    //Tesst page
    @GetMapping("/api/page")
    private APIResponse<List<ProductDto>> getProduct(){
        List<ProductDto> dtos = productService.findAllProduct();
        return new APIResponse<>(dtos.size(), dtos);
    }
    @GetMapping("/api/{field}/{key}")
    private APIResponse<List<ProductDto>> getProductsWithSort(@PathVariable String field, @PathVariable String key){
        List<ProductDto> dtos = productService.findProductsWithSorting(field, key);
        return new APIResponse<>(dtos.size(), dtos);
    }
    @GetMapping("/api/pagination/{offset}/{pageSize}")
    private APIResponse<Page<ProductDto>> getProductsWithPagination(@PathVariable int offset, @PathVariable int pageSize){
        Page<ProductDto> dtos = productService.findProductsWithPagination(offset, pageSize);
        return new APIResponse<>(dtos.getSize(), dtos);
    }

    @GetMapping("/api/paginationAndSort/{offset}/{pageSize}/{field}")
    private APIResponse<Page<ProductDto>> getProductsWithPaginationAndSort(@PathVariable int offset, @PathVariable int pageSize, @PathVariable String field){
        Page<ProductDto> dtos = productService.findProductsWithPaginationAndSorting(offset, pageSize, field);
        return new APIResponse<>(dtos.getSize(), dtos);
    }

    @GetMapping("/api/findProductBySlug/{slug}")
    public ProductDto findProductBySlug(@PathVariable String slug){
        ProductDto dto = productService.findProductBySlug(slug);
        return dto;
    }
}
