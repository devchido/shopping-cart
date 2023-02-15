package com.example.redstore.service.mapper;

import com.example.redstore.domain.User;
import com.example.redstore.service.dto.UserDto;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class UserMapper implements EntityMapper<UserDto, User> {
    @Override
    public UserDto toDo(User user) {
        return null;
    }

    @Override
    public User toEntity(UserDto userDto) {
        return null;
    }

    @Override
    public List<UserDto> toDo(List<User> e) {
        return null;
    }

    @Override
    public List<User> toEntity(List<UserDto> d) {
        return null;
    }
}
