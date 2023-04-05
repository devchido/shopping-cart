package com.example.redstore.auth;

import com.example.redstore.domain.User;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserRepository userRepository;

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
  /*
  http://localhost:8080/api/v1/auth/updateUser/1
  {
    "id": 1,
    "firstName": "Tu",
    "lastName": "Nguyen",
    "mobile": "9666666",
    "email": "tu@gmail.com",
    "password": 1111,
    "photos": "https://static.sangtacvietcdn.xyz/img/useravatar/user1036.gif?t=1650607808",
    "intro": null,
    "profile": null
  }
   */


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

}
