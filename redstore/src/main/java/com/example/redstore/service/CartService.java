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
        User userId = userRepository.findById(String.valueOf(dto.getUserId())).orElse(null);
        entity.setUsers(userId);
        // Set first name
        User userFirstName = userRepository.findByFirstName(dto.getFirstName()).orElse(null);
        entity.setFirstName(String.valueOf(userFirstName));
        //Set Last Name
        User userLastName = userRepository.findByLastName(dto.getLastName()).orElse(null);
        entity.setLastName(String.valueOf(userLastName));
        // Set Mobile
        User userMobile = userRepository.findByMobile(dto.getMobile()).orElse(null);
        entity.setMobile(String.valueOf(userMobile));
        // Set Email
        User userEmail = userRepository.findByEmail(dto.getEmail()).orElse(null);
        entity.setEmail(String.valueOf(userEmail));
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
}
