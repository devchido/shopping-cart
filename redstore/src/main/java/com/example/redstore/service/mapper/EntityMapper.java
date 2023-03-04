package com.example.redstore.service.mapper;

import com.example.redstore.domain.User;
import com.example.redstore.service.dto.ProductDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EntityMapper<D,E>{
    D toDo(E e);
    E toEntity(D d);
    List<D> toDo(List<E> e);
    List<E> toEntity(List<D> d);
}