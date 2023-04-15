package com.example.redstore.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
//                các trang được truy cập sử dụng không cần đăng nhập
                .requestMatchers(
                        "/api/v1/auth/**",
                        "/product/api/**",
                        "/category/api/**",
                        "/product-category/api/**",
                        "/user/api/**"
                )
                .permitAll()
                //test phân quyền truy cập
//                .requestMatchers("/user/auth/forUser/**").hasAnyAuthority("USER", "ADMIN")
                .requestMatchers("/user/auth/admin/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/product-category/auth/admin/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/product/auth/admin/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/order/auth/admin/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/transaction/auth/admin/**").hasAnyAuthority("ADMIN")
                .requestMatchers("/category/auth/**").hasAnyAuthority("ADMIN")
                // phân quyền create, edit, delete product
                .requestMatchers("/product/auth/create").hasAnyAuthority("USER_SHOP","ADMIN")
                .requestMatchers("/product/auth/edit/**").hasAnyAuthority("USER_SHOP","ADMIN")
                .requestMatchers("/product/auth/delete/**").hasAnyAuthority("USER_SHOP","ADMIN")

                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/api/v1/auth/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        ;

        return http.build();
    }
}
