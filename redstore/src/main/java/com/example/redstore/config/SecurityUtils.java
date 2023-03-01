package com.example.redstore.config;
import com.example.redstore.domain.User;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils  {
    public  static User getPrincipal() {
        return (User) (SecurityContextHolder.getContext()).getAuthentication().getPrincipal();
    }
}
