package com.example.redstore.service;

import com.example.redstore.domain.User;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.dto.UserDto;
import com.example.redstore.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

//    public List<UserDto> filter(String id, String firstName, String lastName, String mobile, String email, String admin, String registeredAt) {
//        List<User> entity = userRepository.filter(id, firstName, lastName, mobile, email, admin, registeredAt);
//        List<UserDto> dtos = userMapper.toDo(entity);
//        return dtos;}
    public List<UserDto> filter( ) {
        List<User> entity = userRepository.findAll();
        List<UserDto> dtos = userMapper.toDo(entity);
        return dtos;
    }
}
