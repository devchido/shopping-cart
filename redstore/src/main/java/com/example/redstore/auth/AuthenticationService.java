package com.example.redstore.auth;

import com.example.redstore.config.JwtService;
import com.example.redstore.config.SecurityUtils;
import com.example.redstore.domain.Role;
import com.example.redstore.domain.User;
import com.example.redstore.repository.UserRepository;
import com.example.redstore.service.dto.UserDto;
import com.example.redstore.token.Token;
import com.example.redstore.token.TokenRepository;
import com.example.redstore.token.TokenType;
import com.example.redstore.util.EmailUtil;
import com.example.redstore.util.EmailValidator;
import com.example.redstore.util.OtpUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final OtpUtil otpUtil;
    private final EmailUtil emailUtil;

    public AuthenticationResponse register(UserDto request) {

//        Optional<User> userOptionalEmail = userRepository.findByEmail(request.getEmail());
//        if (userRepository.existsByEmail(request.getEmail())) {
//            throw new RuntimeException("Email: " + request.getEmail() + " đã được sử dụng.");
//        }
//        ;
        String otp = otpUtil.generateOtp();
        if (EmailValidator.isEmailValid(request.getEmail())){
            System.out.println("Email is valid.");
            try {
                emailUtil.sendSingUpEmail(request.getFirstName(), request.getLastName(), request.getEmail(), otp);
            } catch (MessagingException e) {
                throw new RuntimeException("Unable to send otp please try again");
            }
        } else throw new RuntimeException("Email is not valid.");

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .mobile(request.getMobile())
                .photos("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU")
                .vendor(0)
                .createdAt(new Date().toInstant())
                .password(passwordEncoder.encode(otp))
                .role(Role.USER)
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    /*
    http://localhost:8080/user/auth/updateInfo
    {
        "firstName": "Tú",
        "lastName": "Nguyễn",
        "mobile": "0987654321",
        "email": "tu@gmail.com",
        "password": 1111,
        "photos": "https://static.sangtacvietcdn.xyz/img/useravatar/user1036.gif?t=1650607808",
        "intro": "Tú",
        "profile": "RedStore"
      }
     */
    public AuthenticationResponse updateInfo(UserDto dto) {
        var user = userRepository.findById(String.valueOf(SecurityUtils.getPrincipal().getId())).orElseThrow();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setMobile(dto.getMobile());
        user.setEmail(dto.getEmail());
        user.setPassword(SecurityUtils.getPrincipal().getPassword());
//        user.setPhotos(dto.getPhotos());
        user.setIntro(dto.getIntro());
        user.setProfile(dto.getProfile());
        var saveUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(saveUser, jwtToken);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse updatePassUser(UserDto dto) {
        var user = userRepository.findById(String.valueOf(SecurityUtils.getPrincipal().getId())).orElseThrow();
//        user.setId(SecurityUtils.getPrincipal().getId());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        var saveUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(saveUser, jwtToken);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

//    @Bean
//    public AuthenticationResponse tesstCreate() {
//        var user1 = User.builder()
//                .firstName("Admin")
//                .lastName("admin")
//                .email("admin@gmail.com")
//                .mobile("09899899889")
//                .createAt(Instant.now())
//                .password(passwordEncoder.encode("Admin"))
//                .role(Role.ADMIN).build();
//        var savedUser = userRepository.save(user1);
//        var jwtToken = jwtService.generateToken(user1);
//        saveUserToken(savedUser, jwtToken);
//        return AuthenticationResponse.builder()
//                .token(jwtToken)
//                .build();
//    }
    // set ADMIN
//    @Bean
//    public void updateAdmin(){
//        var user = userRepository.findByEmail("tu@gmail.com").orElse(null);
//        user.setRole(Role.ADMIN);
//        userRepository.save(user);
//    }

    /*
    Admin: Cập nhật quyền cho user
     */
    public void updateRoleUser(String userId, String role) {
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Không tìm thấy user" + userId));
        user.setRole(Role.valueOf(role));
        userRepository.save(user);
    }

    // todo: đổi mật khẩu cho user đăng nhập
    public AuthenticationResponse changePassword(String passOld, String passNew) {
        User user = SecurityUtils.getPrincipal();
        if (!passwordEncoder.matches(passOld, user.getPassword())) {
            System.out.println("Đổi mật khẩu không thành công!");
            return null;
        }
        user.setPassword(passwordEncoder.encode(passNew));
        userRepository.save(user);
        System.out.println("Thay đổi mật khẩu thành công.");
        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public Boolean forgotPassword(AuthenticationRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user != null) {
            String otp = otpUtil.generateOtp();
            user.setPassword(passwordEncoder.encode(otp));
            userRepository.save(user);
            System.out.println("Đã đổi mật khâu cho email với mã otp là: " + otp);
            try {
                emailUtil.sendOtpEmail(request.getEmail(), otp);
            } catch (MessagingException e) {
                throw new RuntimeException("Unable to send otp please try again");
            }
            return true;
        } else {
            System.out.println("Không tìm thấy tài khoản!");
            return false;
        }

    }
}
