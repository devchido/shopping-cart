package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.Cart;
import com.example.redstore.domain.Product;
import com.example.redstore.domain.User;
import com.example.redstore.repository.CartRepository;
import com.example.redstore.repository.ProductRepository;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.dto.CartDto;
import com.example.redstore.service.dto.ProductDto;
import com.example.redstore.service.mapper.CartMapper;
import com.example.redstore.service.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
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

    // Create new user
    @Transactional
    public void create(CartDto dto) {

        Cart entity =  cartMapper.toEntity(dto);
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
        cartRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit user
    @Transactional
    public void edit(Long id, CartDto dto){
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
        Cart entity = cartRepository.findById(id).orElse(null);
        if (SecurityUtils.getPrincipal().getId() == entity.getUsers().getId()){
            cartRepository.deleteById(String.valueOf(id));
            System.out.println("Thực thi delete");
        }

    }
    // get all
    public List<CartDto> findAll (){
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
        if (SecurityUtils.getPrincipal().getId() == entity.getUsers().getId()){
            CartDto dto = cartMapper.toDo(entity);
            return dto;
        }
        return null;
    }

    public List<CartDto> finUsersCart() {
        Long userId = SecurityUtils.getPrincipal().getId();
        List<Cart> entity = cartRepository.findUsersCart(userId);
        List<CartDto> dtos = cartMapper.toDo(entity);
        return dtos;
    }


}
