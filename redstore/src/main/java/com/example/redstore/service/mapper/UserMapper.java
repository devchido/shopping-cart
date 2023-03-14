package com.example.redstore.service.mapper;

import com.example.redstore.domain.Role;
import com.example.redstore.domain.User;
import com.example.redstore.service.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class UserMapper implements EntityMapper<UserDto, User> {

    @Override
    public UserDto toDo(User entity) {
        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setMobile(entity.getMobile());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword());
        dto.setCreateAt(entity.getCreateAt());
        dto.setIntro(entity.getIntro());
        dto.setProfile(entity.getProfile());
        dto.setPhotos(entity.getPhotos());
        dto.setRole(String.valueOf(entity.getRole()));
        return dto;
    }

    @Override
    public User toEntity(UserDto dto) {
        User entity = new User();
        entity.setId(dto.getId());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setMobile(dto.getMobile());
        entity.setEmail(dto.getEmail());
        entity.setPassword(dto.getPassword());
        entity.setCreateAt(dto.getCreateAt());
        entity.setIntro(dto.getIntro());
        entity.setProfile(dto.getProfile());
        entity.setPhotos(dto.getPhotos());
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
