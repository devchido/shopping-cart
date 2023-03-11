package com.example.redstore.resources;

import com.example.redstore.auth.AuthenticationResponse;
import com.example.redstore.auth.AuthenticationService;
import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.User;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.UserService;
import com.example.redstore.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserResources {
    private final UserService userService;
    private final UserRepository userRepository;
    private final AuthenticationService service;

    //cho nay lan sau de post lay dto nhe
    @GetMapping("/filter")
    List<UserDto> filter(@RequestParam(defaultValue = "") String id,
                         @RequestParam(defaultValue = "") String firstName,
                         @RequestParam(defaultValue = "") String lastName,
                         @RequestParam(defaultValue = "") String mobile,
                         @RequestParam(defaultValue = "") String email) {
        List<UserDto> dtos = userService.filter(id, firstName, lastName, mobile, email);
        return dtos;
    }


    //edit
    @PutMapping("/{id}")
    public void edit(@RequestBody UserDto dto, @PathVariable("id") Long id) {
        userService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        userService.delete(id);
    }

    @GetMapping("")
    public List<UserDto> findAll() {

        List<UserDto> dtos = userService.findAll();
        return dtos;
    }

    // http://localhost:8080/user/page?page=1&size=2
    @GetMapping("/page")
    public ResponseEntity<List<UserDto>> findAllPage(Pageable pageable) {
        Page<UserDto> page = userService.findAllPage(pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("total", String.valueOf(page.getTotalElements()));
        headers.add("totalPages", String.valueOf(page.getTotalPages()));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/info")
    public UserDto getUserInformation() {
        return userService.getUserInformation();
    }

    // Page: Phân trang
//    Pageable pageable = PageRequest.of(1, 10);
    @PutMapping("/updatePassUser")
    public ResponseEntity<AuthenticationResponse> updatePassUser(
            @RequestBody UserDto dto
    ){
        return ResponseEntity.ok(service.updatePassUser(dto));
    }
    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('USER')")
    public String forUser(){
        return "This URL is only accessible to user";
    }
}
