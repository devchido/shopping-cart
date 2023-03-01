package com.example.redstore;

import com.example.redstore.config.WebConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class RedstoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(RedstoreApplication.class, args);
	}

//	public WebMvcConfigurer configurer(){
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/*").allowedMethods("*");
//			}
//		};
//	}

}
