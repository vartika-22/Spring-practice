package com.spring.log.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.log.config.JwtProvider;
import com.spring.log.model.User;
import com.spring.log.repository.UserRepository;
import com.spring.log.request.LoginRequest;
import com.spring.log.service.CustomUserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private CustomUserDetailsService customUserDetails;
	

	
	@PostMapping("/signup")
	public AuthResponse createUser(@RequestBody User user) throws Exception {
		User userExist=userRepository.findByEmail(user.getEmail());
		if(userExist!=null) {
			throw new Exception("user already exist with email");
		}
		
		User newUser=new User();
		newUser.setId(user.getId());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(user.getPassword());
		newUser.setGender(user.getGender());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		User savedUser=userRepository.save(newUser);
		
		Authentication authentication=new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
		
		String token=JwtProvider.generateToken(authentication);
		
		AuthResponse response=new AuthResponse(token,"Register success");
		return response;
	}
	
	
	@PostMapping("/signin")
	public AuthResponse signIn(@RequestBody LoginRequest loginRequest ) {
		Authentication authentication=authenticate(loginRequest.getEmail(),loginRequest.getPassword());
		String token=JwtProvider.generateToken(authentication);
		
		AuthResponse response=new AuthResponse(token,"login success");
		return response;
	}


	private Authentication authenticate(String email, String password) {
		UserDetails userDetails=customUserDetails.loadUserByUsername(email);
		if(userDetails==null) {
			throw new BadCredentialsException("invalid username");
		}
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("wrong password");
			
		}
		return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
	}
	

}
