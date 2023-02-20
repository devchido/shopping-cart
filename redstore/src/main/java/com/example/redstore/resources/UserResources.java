package com.example.redstore.resources;

import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.UserService;
import com.example.redstore.service.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserResources {
    private final UserService userService;

    //    @GetMapping("/filter")
//    List<UserDto> filter(@RequestParam String id,@RequestParam String firstName,@RequestParam String lastName,@RequestParam String mobile,@RequestParam String email,@RequestParam String admin,@RequestParam String registeredAt){
//        List<UserDto> dtos = userService.filter(id, firstName, lastName, mobile, email, admin, registeredAt);
//        return dtos;
//    }
    @GetMapping("")
    List<UserDto> filter(){
        List<UserDto> dtos = userService.filter();
        return dtos;
    }
}
