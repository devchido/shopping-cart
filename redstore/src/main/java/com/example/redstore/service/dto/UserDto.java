package com.example.redstore.service.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;
@Data
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String mobile;
    private String email;
    private String password;
    private Boolean admin;
    private Boolean vendor;
    private Instant registeredAt;
    private Instant lastLogin;
    private String intro;
    private String profile;
}