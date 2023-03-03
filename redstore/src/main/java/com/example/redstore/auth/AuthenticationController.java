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

  // http://localhost:8080/api/v1/auth/register
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
  @PutMapping("/updateUser/{id}")
  public ResponseEntity<AuthenticationResponse> updateUser(
          @RequestBody UserDto dto, @PathVariable("id") Long id
  ){
    return ResponseEntity.ok(service.updateUser(dto, id));
  }



}
