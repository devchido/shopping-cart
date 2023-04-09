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
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.mapper.CartMapper;
import com.example.redstore.service.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {
    public final CartRepository cartRepository;
    public final CartMapper cartMapper;

    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final CartItemService cartItemService;
    private final ProductRepository productRepository;

    // Create new user
    @Transactional
    public void create(CartDto dto) {

        Cart entity = cartMapper.toEntity(dto);
        // Set userId
        User user = SecurityUtils.getPrincipal();
        entity.setUsers(user);

        // Set trạng thái
        entity.setStatus((short) 0);
        // Set first name
        entity.setFirstName(user.getFirstName());
        //Set Last Name
        entity.setLastName(user.getLastName());
        // Set Mobile
        entity.setMobile(user.getMobile());
        // Set Email
        entity.setEmail(user.getEmail());
        // Set create at
        entity.setCreatedAt(Instant.now());
        entity.setUpdatedAt(Instant.now());
        cartRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit user
    @Transactional
    public void edit(Long id, CartDto dto) {
        Cart entity = cartRepository.findById(String.valueOf(id)).orElse(null);
        // Cập nhật thông tin user
        User user = userRepository.findById(String.valueOf(entity.getUsers().getId())).orElse(null);
        entity.setFirstName(user.getFirstName());
        entity.setLastName(user.getLastName());
        entity.setMobile(user.getMobile());
        entity.setEmail(user.getEmail());
        // Cập nhật thông tin địa chỉ đơn hàng
        entity.setLine1(dto.getLine1());
        entity.setCity(dto.getCity());
        entity.setCountry(dto.getCountry());
        entity.setContent(dto.getContent());
        // Set update at
        entity.setUpdatedAt(Instant.now());
        cartRepository.save(entity);

        System.out.println("Thực thi edit");
    }

    // Delete user's cart with cart's id
    @Transactional
    public void delete(String id) {
        Cart entity = cartRepository.findById(id).orElseThrow();
        if (SecurityUtils.getPrincipal().getId() == entity.getUsers().getId()) {
            if (entity.getStatus() == 0) {
                //
                List<CartItem> cartItemList = cartItemRepository.findByCartId(Long.valueOf(id));
                //
                if (cartItemList.toArray().length > 0) {
                    //
                    cartItemList.forEach(cartItem -> {
//                        cartItemRepository.deleteById(String.valueOf(cartItem.getId()));
                        System.out.println("Xoá cart item id=  "+ cartItem.getId() + "product title " + cartItem.getProduct().getTitle());
                        // set thông tin cho product
                        Product productId = productRepository.findById(String.valueOf(cartItem.getProduct().getId())).orElseThrow();
                        Cart cart = cartRepository.findById(String.valueOf(cartItem.getCart().getId())).orElseThrow();
                        int quantity = productId.getQuantity() + cartItem.getQuantity();
                        productId.setQuantity((short) quantity);
                        productId.setUpdatedAt(Instant.now());
                        productRepository.save(productId);
                        // sau khi xoá cartitem thì cập nhật thông tin cho cart
                        cart.setUpdatedAt(Instant.now());
                        cartRepository.save(cart);
                        // Sau cùng là xoá cart item
                        cartItemRepository.deleteById(String.valueOf(cartItem.getId()));
                    });
                    //
//                    cartRepository.deleteById(id);
                    System.out.println("Thực thi delete cho cart có item");
                } else {
                    //
                    cartRepository.deleteById(id);
                    System.out.println("Thực thi delete cho cart không có item");
                }
            }
        }
    }

    // get all
    public List<CartDto> findAll() {
        List<Cart> entity = cartRepository.findAll();
        List<CartDto> dtos = cartMapper.toDo(entity);
        return dtos;
    }

    public List<CartDto> findAllByUserId(Long userId) {
        List<Cart> entity = cartRepository.findAllByUsersId(userId);
        List<CartDto> dtos = cartMapper.toDo(entity);
        return dtos;
    }

    //
    public CartDto findMyCartById(String id) {
        Cart entity = cartRepository.findById(id).orElse(null);
        if (SecurityUtils.getPrincipal().getId() == entity.getUsers().getId()) {
            CartDto dto = cartMapper.toDo(entity);
            return dto;
        }
        return null;
    }

    public List<CartDto> findUsersCart(String status) {
        Long userId = SecurityUtils.getPrincipal().getId();
        List<Cart> entity = cartRepository.findUsersCart(userId, status);
        List<CartDto> dtos = cartMapper.toDo(entity);
        return dtos;
    }


}
