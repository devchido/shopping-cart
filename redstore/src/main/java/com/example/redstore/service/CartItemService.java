package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
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
import java.util.Optional;

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
        // Kiểm tra product đó trong list product có tồn tại hay không
        Product productId = productRepository.findById(String.valueOf(dto.getProductId())).orElse(null);
        entity.setProduct(productId);
        // Set thông tin cart item
        Cart cartId = cartRepository.findById(String.valueOf(dto.getCartId())).orElse(null);
        entity.setCart(cartId);
        entity.setPrice(productId.getPrice());
        entity.setDiscount(productId.getDiscount());
        //
        int quantity = productId.getQuantity() - entity.getQuantity();
        productId.setQuantity((short) quantity);
        productId.setUpdatedAt(Instant.now());
        productRepository.save(productId);
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
        CartItem cartItem = cartItemRepository.findById(String.valueOf(id)).orElse(null);
        // Kiểm tra product đó trong list product có tồn tại hay không
        Product productId = productRepository.findById(String.valueOf(dto.getProductId())).orElse(null);

        entity.setProduct(productId);
        // Set cart
        // Kiểm tra cart được chọn có tồn tại hay không
        Cart cartId = cartRepository.findById(String.valueOf(dto.getCartId())).orElse(null);
        entity.setCart(cartId);
        // Set Quantity
        int quantity = productId.getQuantity() + cartItem.getQuantity() - entity.getQuantity();
        productId.setQuantity((short) quantity);
        productId.setUpdatedAt(Instant.now());
        productRepository.save(productId);

        // Set update at
        entity.setUpdatedAt(Instant.now());
        cartItemRepository.save(entity);

        System.out.println("Thực thi edit");
    }

    // Delete user
    @Transactional
    public void delete(Long id) {
        CartItem cartItem = cartItemRepository.findById(String.valueOf(id)).orElse(null);
        Product productId = productRepository.findById(String.valueOf(cartItem.getProduct().getId())).orElse(null);

        int quantity = productId.getQuantity() + cartItem.getQuantity();
        productId.setQuantity((short) quantity);
        productId.setUpdatedAt(Instant.now());
        productRepository.save(productId);
        cartItemRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
    }
    // get all

    public List<CartItemDto> findAll(){
        List<CartItem> entity = cartItemRepository.findAll();
        List<CartItemDto> dtos = cartItemMapper.toDo(entity);
        return dtos;
    }
    // Get cart item with id cart
    // todo: security user id = cart user id
    public List<CartItemDto> findByCartId(Long cartId){
        Long userSecurityId = SecurityUtils.getPrincipal().getId();
        Cart cartUser = cartRepository.findById(String.valueOf(cartId)).orElse(null);
        if (userSecurityId == cartUser.getId()){
            List<CartItem> entity = cartItemRepository.findByCartId(cartId);
            List<CartItemDto> dtos = cartItemMapper.toDo(entity);
            return dtos;
        }
        return null;
    }
}
