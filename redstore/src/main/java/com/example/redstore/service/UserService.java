package com.example.redstore.service;

import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.User;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.dto.UserDto;
import com.example.redstore.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;


    // Filter user by: id, firstName, lastName, mobile, email
    public List<UserDto> filter(String id, String firstName, String lastName, String mobile, String email) {
        List<User> entity = userRepository.filter(id, firstName, lastName, mobile, email);
        List<UserDto> dtos = userMapper.toDo(entity);
        return dtos;}

    // Create new user
    /*
    @Transactional
    public void create(UserDto dto) {
        // get tất cả các id đã có
//        Optional<User> userOptionalId = userRepository.findById(String.valueOf(dto.getId()));
        // Nếu id nhập vào đã có thì thông báo đã có id và hủy sự sự kiện create
//        if (userOptionalId.isPresent()){
//            throw new RuntimeException("Đã có id :" + dto.getId());
//        };
        Optional<User> userOptionalmobile = userRepository.findByMobile(dto.getMobile());
        if (userOptionalmobile.isPresent()){
            throw new RuntimeException("Mobile: " + dto.getMobile() + " đã được sử dụng.");
        };
        Optional<User> userOptionalemail = userRepository.findByEmail(dto.getEmail());
        if (userOptionalemail.isPresent()){
            throw new RuntimeException("Email:" + dto.getEmail() + "đã được sử dụng.");
        };
        User entity =  userMapper.toEntity(dto);
        userRepository.save(entity);
        System.out.println("Thực thi create");
    }
    */


    // Edit user
    @Transactional
    public void edit(Long id, UserDto dto){
        User user = userMapper.toEntity(dto);
        user.setId(id);
        userRepository.save(user);

        System.out.println("Thực thi edit");
    }

    // Delete user
    @Transactional
    public void delete(Long id) {
        userRepository.deleteById(String.valueOf(id));
        System.out.println("Thực thi delete");
    }
    // get all
    public List<UserDto> findAll (){
        List<User> entity =userRepository.findAll();
        List<UserDto> dtos = userMapper.toDo(entity);
        return dtos;
    }

    @Transactional
    public Page<UserDto> findAllPage(Pageable pageable){
        return userRepository.findAll(pageable).map(userMapper::toDo);
    }

    @Transactional
    public UserDto getUserInformation(){
        User entity = SecurityUtils.getPrincipal();
        UserDto dto = userMapper.toDo(entity);
        return dto;
    }
}
