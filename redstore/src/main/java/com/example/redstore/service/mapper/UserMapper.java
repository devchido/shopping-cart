package com.example.redstore.service.mapper;

import com.example.redstore.domain.User;
import com.example.redstore.service.dto.UserDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class UserMapper implements EntityMapper<UserDto, User> {
    @Override
    public UserDto toDo(User entity) {
        UserDto dto = new UserDto();
//        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setMobile(entity.getMobile());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword());
        dto.setAdmin(entity.getAdmin());
        dto.setVendor(entity.getVendor());
        dto.setRegisteredAt(entity.getRegisteredAt());
        dto.setLastLogin(entity.getLastLogin());
        dto.setIntro(entity.getIntro());
        entity.setProfile(entity.getProfile());
        return dto;
    }

    @Override
    public User toEntity(UserDto dto) {
        User entity = new User();
//        entity.setId(dto.getId());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setMobile(dto.getMobile());
        entity.setEmail(dto.getEmail());
        entity.setPassword(dto.getPassword());
        entity.setAdmin(dto.getAdmin());
        entity.setVendor(dto.getVendor());
        entity.setRegisteredAt(dto.getRegisteredAt());
        entity.setLastLogin(dto.getLastLogin());;
        entity.setIntro(dto.getIntro());
        entity.setProfile(dto.getProfile());
        return entity;
    }

    @Override
    public List<UserDto> toDo(List<User> e) {
        List<UserDto> dtos = new ArrayList<>();
        e.forEach(user -> {
            UserDto dto = toDo(user);
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<User> toEntity(List<UserDto> d) {
        return null;
    }
}
