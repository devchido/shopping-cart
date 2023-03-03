package com.example.redstore.service.dto;

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
    private Boolean admin;
    private Boolean vendor;
    private Instant createAt;
    private String photos;
    private Instant lastLogin;
    private String intro;
    private String profile;
}