package com.example.redstore.auth;

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




}
