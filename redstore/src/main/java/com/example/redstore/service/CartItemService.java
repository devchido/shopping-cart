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

        CartItem entity = cartItemMapper.toEntity(dto);
        //Check có cart với id được thêm không? get data
        Cart cartId = cartRepository.findById(String.valueOf(dto.getCartId())).orElse(null);
        // Set product
        // Kiểm tra product đó trong list product có tồn tại hay không
        Product productId = productRepository.findById(String.valueOf(dto.getProductId())).orElse(null);

        // Check product được chọn đã có trong giỏ hàng hay chưa?
        //
        CartItem cartItem = cartItemRepository.findByProductAndCart(dto.getProductId(), dto.getCartId()).orElse(null);

        if (cartItem != null){
            // set thêm giá trị quantity : cartItem
            cartItem.setQuantity((short) (cartItem.getQuantity() + entity.getQuantity()));
            cartItem.setUpdatedAt(Instant.now());
            cartId.setUpdatedAt(Instant.now());
            cartItemRepository.save(cartItem);
            // set giá trị : product
            int quantity = productId.getQuantity() - entity.getQuantity();
            productId.setQuantity((short) quantity);
            productId.setUpdatedAt(Instant.now());
            productRepository.save(productId);
            System.out.println("Thực thi mua thêm lần nữa");
        } else {
            entity.setProduct(productId);
            // Set thông tin cart item
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
            // Set dữ liệu cho cart
            cartId.setStatus((short) 1);
            // Save data
            cartRepository.save(cartId);
            cartItemRepository.save(entity);
            System.out.println("Thực thi create");
        }



    }

    // Edit user
    @Transactional
    public void edit(Long id, CartItemDto dto) {


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

    // người mua thực hiện delete: xoá item khỏi giỏ hàng
    @Transactional
    public void delete(String id) {
        CartItem cartItem = cartItemRepository.findById(id).orElse(null);
        Product productId = productRepository.findById(String.valueOf(cartItem.getProduct().getId())).orElse(null);

        int quantity = productId.getQuantity() + cartItem.getQuantity();
        productId.setQuantity((short) quantity);
        productId.setUpdatedAt(Instant.now());
        productRepository.save(productId);
        cartItemRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
    }

    // Người bán thực hiện delete: xoá cart item của người người mua khỏi giỏ hàng của họ vì lý do nào đó
    public void removeProductCartFromUser(String id) {
        CartItem cartItem = cartItemRepository.findById(id).orElse(null);
        Long userId = SecurityUtils.getPrincipal().getId();
        // Check người thực hiện có phải là người quản lý sản phẩm đó không
        if (userId == cartItem.getProduct().getUsers().getId()) {
            // get data của product được chọn by product's id from cartItem
            Product productId = productRepository.findById(String.valueOf(cartItem.getProduct().getId())).orElse(null);
            // Trả về dữ liệu cho sản phẩm sau khi xoá và lưu lại
            int quantity = productId.getQuantity() + cartItem.getQuantity();
            productId.setQuantity((short) quantity);
            productId.setUpdatedAt(Instant.now());
            productRepository.save(productId);
            cartItemRepository.deleteById(id);
        }

    }
    // get all

    public List<CartItemDto> findAll() {
        List<CartItem> entity = cartItemRepository.findAll();
        List<CartItemDto> dtos = cartItemMapper.toDo(entity);
        return dtos;
    }

    // Get cart item with id cart
    // todo: security user id = cart user id
    public List<CartItemDto> findByCartId(Long cartId) {
        Long userSecurityId = SecurityUtils.getPrincipal().getId();
        Cart cartUser = cartRepository.findById(String.valueOf(cartId)).orElse(null);
        if (userSecurityId == cartUser.getUsers().getId()) {
            List<CartItem> entity = cartItemRepository.findByCartId(cartId);
            List<CartItemDto> dtos = cartItemMapper.toDo(entity);
            return dtos;
        }
        return null;
    }

    public List<CartItemDto> findCartItemByProductUserId() {
        Long productUserId = SecurityUtils.getPrincipal().getId();
        List<CartItem> entity = cartItemRepository.findCartItemByProductUserId(productUserId);
        List<CartItemDto> dtos = cartItemMapper.toDo(entity);
        return dtos;
    }


}
