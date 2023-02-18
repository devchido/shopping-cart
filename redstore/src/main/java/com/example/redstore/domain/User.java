package com.example.redstore.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "firstName", length = 50)
    private String firstName;

    @Column(name = "lastName", length = 50)
    private String lastName;

    @Column(name = "mobile", length = 15)
    private String mobile;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "password", nullable = false, length = 32)
    private String password;

    @Column(name = "admin", nullable = false)
    private Boolean admin = false;

    @Column(name = "vendor", nullable = false)
    private Boolean vendor = false;

    @Column(name = "registeredAt", nullable = false)
    private Instant registeredAt;

    @Column(name = "lastLogin")
    private Instant lastLogin;

    @Column(name = "intro")
    private String intro;

    @Lob
    @Column(name = "profile")
    private String profile;


}