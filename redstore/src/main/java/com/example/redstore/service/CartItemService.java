package com.example.redstore.service;

import com.example.redstore.domain.Cart;
import com.example.redstore.domain.CartItem;
import com.example.redstore.domain.Product;
import com.example.redstore.domain.User;
import com.example.redstore.repository.CartItemRepository;
import com.example.redstore.repository.CartRepository;
import com.example.redstore.repository.ProductRepository;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.dto.CartDto;
import com.example.redstore.service.dto.CartItemDto;
import com.example.redstore.service.mapper.CartItemMapper;
import com.example.redstore.service.mapper.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    public final CartItemMapper cartItemMapper;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    // Create new
    @Transactional
    public void create(CartItemDto dto) {

        CartItem entity =  cartItemMapper.toEntity(dto);
        // Set product
        Product productId = productRepository.findById(String.valueOf(dto.getProductId())).orElse(null);
        entity.setProduct(productId);
        // Set cart
        Cart cartId = cartRepository.findById(String.valueOf(dto.getCartId())).orElse(null);
        entity.setCart(cartId);

        // Set active
        entity.setActive(true);

        // Set create at
        entity.setCreatedAt(Instant.now());
        cartItemRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit user
    @Transactional
    public void edit(Long id, CartItemDto dto){
        CartItem entity = cartItemMapper.toEntity(dto);
        entity.setId(id);
        // Set product
        Product productId = productRepository.findById(String.valueOf(dto.getProductId())).orElse(null);
        entity.setProduct(productId);
        // Set cart
        Cart cartId = cartRepository.findById(String.valueOf(dto.getCartId())).orElse(null);
        entity.setCart(cartId);

        // Set update at
        entity.setUpdatedAt(Instant.now());
        cartItemRepository.save(entity);

        System.out.println("Thực thi edit");
    }

    // Delete user
    @Transactional
    public void delete(Long id) {
        cartItemRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
    }
    // get all
    @Transactional
    public List<CartItemDto> findAll(){
        List<CartItem> entity = cartItemRepository.findAll();
        List<CartItemDto> dtos = cartItemMapper.toDo(entity);
        return dtos;
    }
    public List<CartItemDto> findByCartId(Long cartId){
        List<CartItem> entity = cartItemRepository.findByCartId(cartId);
        List<CartItemDto> dtos = cartItemMapper.toDo(entity);
        return dtos;

    }
}
