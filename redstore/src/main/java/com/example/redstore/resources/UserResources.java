package com.example.redstore.resources;

import com.example.redstore.auth.AuthenticationResponse;
import com.example.redstore.auth.AuthenticationService;
import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.User;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.UserService;
import com.example.redstore.service.dto.APIResponse;
import com.example.redstore.service.dto.ProductCategoryDto;
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
    private final AuthenticationService service;

    //cho nay lan sau de post lay dto nhe
    /*
    http://localhost:8080/user/auth/admin/filter?id=&firstName=&lastName=&mobile=&email=
     */
    @GetMapping("/auth/admin/filter")
    List<UserDto> filter(@RequestParam(defaultValue = "") String id,
                         @RequestParam(defaultValue = "") String firstName,
                         @RequestParam(defaultValue = "") String lastName,
                         @RequestParam(defaultValue = "") String mobile,
                         @RequestParam(defaultValue = "") String email) {
        List<UserDto> dtos = userService.filter(id, firstName, lastName, mobile, email);
        return dtos;
    }


    //edit
    @PutMapping("/auth/edit/{id}")
    public void edit(@RequestBody UserDto dto, @PathVariable("id") Long id) {
        userService.edit(id, dto);
    }

    //delete
    @DeleteMapping("/auth/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        userService.delete(id);
    }

    @GetMapping("/auth/admin")
    public List<UserDto> findAll() {
        List<UserDto> dtos = userService.findAll();
        return dtos;
    }

    // http://localhost:8080/user/page?page=1&size=2
    @GetMapping("/auth/admin/page")
    public ResponseEntity<List<UserDto>> findAllPage(Pageable pageable) {
        Page<UserDto> page = userService.findAllPage(pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("total", String.valueOf(page.getTotalElements()));
        headers.add("totalPages", String.valueOf(page.getTotalPages()));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/auth/info")
    public UserDto getUserInformation() {
        UserDto dto = userService.getUserInformation();
        return dto;
    }

    // Page: Phân trang
//    Pageable pageable = PageRequest.of(1, 10);
    @PutMapping("/auth/updatePassUser")
    public ResponseEntity<AuthenticationResponse> updatePassUser(
            @RequestBody UserDto dto
    ){
        return ResponseEntity.ok(service.updatePassUser(dto));
    }


    // Cập nhật thông tin người dùng
    @PutMapping("/auth/updateInfo")
    public ResponseEntity<AuthenticationResponse> updateInfo(@RequestBody UserDto dto){
        return ResponseEntity.ok(service.updateInfo(dto));
    }

    // Admin: Cập nhật quyền cho user
    @PutMapping("/auth/admin/role")
    public void updateRoleUser(@RequestParam String userId, @RequestParam String role){
        service.updateRoleUser(userId, role);
    }
    // todo: findAllUsers
    @GetMapping("/auth/admin/{offset}/{pageSize}")
    private APIResponse<Page<UserDto>> findAllUsers(
            @PathVariable int offset,
            @PathVariable int pageSize,
            @RequestParam(value = "field", defaultValue = "id") String field,
            @RequestParam(value = "sort", defaultValue = "ASC") String sort,
            @RequestParam(value = "keyname", defaultValue = "") String keyname,
            @RequestParam(value = "mobile", defaultValue = "") String mobile,
            @RequestParam(value = "email", defaultValue = "") String email,
            @RequestParam(value = "role", defaultValue = "") String role
            ) {
        Page<UserDto> dtos = userService.findAllUsers(
                 offset, pageSize, field, sort, keyname, mobile, email, role
        );
        return new APIResponse<>(dtos.getSize(), dtos);
    }
    // todo: findUserById
    @GetMapping("/auth/admin/u/{id}")
    private UserDto findUserById(@PathVariable String id){
        UserDto dto = userService.findUserById(id);
        return dto;
    }

//    test admin : false
    @GetMapping({"/auth/forUser"})
    public String forUser(){
        return "This URL is only accessible to user";
    }

    @GetMapping({"/auth/forAdmin"})
    public String forAdmin(){
        return "This URL is only accessible to Admin";
    }
}
