package com.example.redstore.service;

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
        User userId = userRepository.findById(String.valueOf(dto.getUserId())).orElse(null);
        entity.setUsers(userId);
        // Set first name

        entity.setFirstName(userId.getFirstName());
        //Set Last Name
        entity.setLastName(userId.getLastName());
        // Set Mobile
        entity.setMobile(userId.getMobile());
        // Set Email
        entity.setEmail(userId.getEmail());
        // Set create at
        entity.setCreatedAt(Instant.now());
        cartRepository.save(entity);
        System.out.println("Thực thi create");
    }

    // Edit user
    @Transactional
    public void edit(Long id, CartDto dto){
        Cart entity = cartMapper.toEntity(dto);
        entity.setId(id);

        // Set update at
        entity.setUpdatedAt(Instant.now());
        cartRepository.save(entity);

        System.out.println("Thực thi edit");
    }

    // Delete user
    @Transactional
    public void delete(Long id) {
        cartRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
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
}
