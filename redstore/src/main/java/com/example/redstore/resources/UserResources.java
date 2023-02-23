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

    @GetMapping("/filter")
    List<UserDto> filter(@RequestParam String id, @RequestParam String firstName, @RequestParam String lastName, @RequestParam String mobile, @RequestParam String email) {
        List<UserDto> dtos = userService.filter(id, firstName, lastName, mobile, email);
        return dtos;
    }

    @PostMapping("")
    public void create(@RequestBody UserDto dto) {
        userService.create(dto);
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
    public List<UserDto> findAll(){
        List<UserDto> dtos = userService.findAll();
        return dtos;
    }
}
