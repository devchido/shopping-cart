package com.example.redstore.resources;

import com.example.redstore.service.ProductService;
import com.example.redstore.service.UserService;
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

    @GetMapping("")
    public List<ProductDto> findAll() {
        List<ProductDto> dtos = productService.findAll();
        return dtos;
    }

    // http://localhost:8080/user/page?page=1&size=2
    @GetMapping("/page")
    public ResponseEntity<List<ProductDto>> findAllPage(Pageable pageable) {
        Page<ProductDto> page = productService.findAllPage(pageable);

        HttpHeaders headers = new HttpHeaders();
        headers.add("total", String.valueOf(page.getTotalElements()));
        headers.add("totalPages", String.valueOf(page.getTotalPages()));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/filter")
    public List<ProductDto> filter(
            @RequestParam(defaultValue = "") String keySearch
    ) {
        List<ProductDto> dtos = productService.filter( keySearch);
        return dtos;
    }
    @GetMapping("/{users}")
    public List<ProductDto> findByUsers(@PathVariable("users") Long users){
        List<ProductDto> dtos = productService.findByUsers(users);
        return dtos;
    }


}
