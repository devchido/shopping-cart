package com.example.redstore.repository;

import com.example.redstore.domain.ImageUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageUserRepository extends JpaRepository<ImageUser,Long> {


    Optional<ImageUser> findByName(String fileName);
    Optional<ImageUser> findByUserId(Long userId);
}
