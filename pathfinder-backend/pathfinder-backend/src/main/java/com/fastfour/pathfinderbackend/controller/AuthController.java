package com.fastfour.pathfinderbackend.controller;

import com.fastfour.pathfinderbackend.auth.JWTUtil;
import com.fastfour.pathfinderbackend.model.User;
import com.fastfour.pathfinderbackend.model.dto.LoginFormDTO;
import com.fastfour.pathfinderbackend.model.dto.ResponseDTO;
import com.fastfour.pathfinderbackend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    HttpSession session;

    JWTUtil jwtUtil;

    private static final String userSessionKey = "username";

    // @Autowired
    // public AuthController(HttpSession session, LoginFormDTO loginFormDTO) {
    // this.session = session;
    // this.loginFormDTO = loginFormDTO;
    // }

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }
        Optional<User> user = userRepository.findById(Long.valueOf(userId));
        return user.orElse(null);
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    @GetMapping("/current")
    public User showCurrentUser() {
        return (User) session.getAttribute("username");
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginFormDTO loginFormDTO, HttpServletRequest request) {
        User theUser = userRepository.findByUsername(loginFormDTO.getUsername());
        HttpStatus httpStatus = HttpStatus.OK;
        String password = loginFormDTO.getPassword();
        if (!password.equals(theUser.getPassword())) {
            loginFormDTO.setPassword(null);
            httpStatus = HttpStatus.CONFLICT;
        }
        String token = "token123";
        ResponseDTO responseDTO = new ResponseDTO(theUser.getUsername(), token);
        setUserInSession(request.getSession(), theUser);
        return new ResponseEntity<>(responseDTO, httpStatus);
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request) {
        request.getSession().invalidate();
    }
}



// Forked and cloned 01/2024
