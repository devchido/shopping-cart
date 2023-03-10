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
    http://localhost:8080/product
    {
        "userId": "1",
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
    @PostMapping("")
    public void create(@RequestBody ProductDto dto) {
        productService.create(dto);
    }

    //edit
    @PutMapping("/{id}")
    public void edit(@RequestBody ProductDto dto, @PathVariable("id") Long id) {
        productService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        productService.delete(id);
    }

    @GetMapping("/findAllProduct")
    public List<ProductDto> findAllProduct() {
        List<ProductDto> dtos = productService.findAllProduct();
        return dtos;
    }



    @GetMapping("/filter")
    public List<ProductDto> filter(
            @RequestParam(defaultValue = "") String keySearch
    ) {
        List<ProductDto> dtos = productService.filter( keySearch);
        return dtos;
    }
    @GetMapping("/user/{users}")
    public List<ProductDto> findByUsers(@PathVariable("users") Long users){
        List<ProductDto> dtos = productService.findByUsers(users);
        return dtos;
    }

    //Tesst page
    @GetMapping("")
    private APIResponse<List<ProductDto>> getProduct(){
        List<ProductDto> dtos = productService.findAllProduct();
        return new APIResponse<>(dtos.size(), dtos);
    }
    @GetMapping("/{field}")
    private APIResponse<List<ProductDto>> getProductsWithSort(@PathVariable String field){
        List<ProductDto> dtos = productService.findProductsWithSorting(field);
        return new APIResponse<>(dtos.size(), dtos);
    }
    @GetMapping("/pagination/{offset}/{pageSize}")
    private APIResponse<Page<ProductDto>> getProductsWithPagination(@PathVariable int offset, @PathVariable int pageSize){
        Page<ProductDto> dtos = productService.findProductsWithPagination(offset, pageSize);
        return new APIResponse<>(dtos.getSize(), dtos);
    }

    @GetMapping("/paginationAndSort/{offset}/{pageSize}/{field}")
    private APIResponse<Page<ProductDto>> getProductsWithPaginationAndSort(@PathVariable int offset, @PathVariable int pageSize, @PathVariable String field){
        Page<ProductDto> dtos = productService.findProductsWithPaginationAndSorting(offset, pageSize, field);
        return new APIResponse<>(dtos.getSize(), dtos);
    }
}
