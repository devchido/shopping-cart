package com.example.redstore.dto;

import com.example.redstore.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String mobile;
    private String email;
    private String password;
    private Integer vendor;
    private Instant createdAt;
    private String photos;
    private String intro;
    private String profile;
    private String role;
}