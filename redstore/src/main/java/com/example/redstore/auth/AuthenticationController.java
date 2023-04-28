package com.example.redstore.auth;

import com.example.redstore.domain.User;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.ImageProductService;
import com.example.redstore.service.ImageUserSevice;
import com.example.redstore.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserRepository userRepository;
    private final ImageUserSevice imageUserSevice;
    private final ImageProductService imageProductService;

    /*
    http://localhost:8080/api/v1/auth/register
    {
      "firstName": "Nguyễn",
      "lastName": "Tú",
      "email": "tunguyen@gmail.com",
      "mobile": "098412367",
      "password": "1111"
    }
    * */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody UserDto request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    // Check gmail
    @GetMapping("/check-email")
    public String checkEmail(@RequestParam String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            return "Email đã tồn tại";
        } else {
            return null;
        }
    }
    @GetMapping("/check-mobile")
    public String checkMobile(@RequestParam String mobile) {
        User user = userRepository.findByMobile(mobile).orElse(null);
        if (user != null) {
            return "Mobile đã tồn tại";
        } else {
            return null;
        }
    }

    @GetMapping("/image/user/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName) {
        byte[] imageData = imageUserSevice.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }
    @GetMapping("/image/product/{fileName}")
    public ResponseEntity<?> downloadProductImage(@PathVariable String fileName){
        byte [] imageProduct = imageProductService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageProduct);
    }

}
