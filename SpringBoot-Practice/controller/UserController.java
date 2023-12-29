package com.spring.log.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.log.model.User;
import com.spring.log.repository.UserRepository;
import com.spring.log.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;

	
	@GetMapping("/api/users")
	public List<User> getUsers() {
		List<User> users=userRepository.findAll();
		return users ;
	
	}
	@PostMapping("/api/users")
	public User createUser(@RequestBody User user) {
		User savedUser=userService.registerUser(user);
		return savedUser;
	}
	
	@GetMapping("/api/users/{id}")
	public User getUserById(@PathVariable("id")Integer id){
		User user=userService.findUserById(id);
		return user;
	}
	
	
	@PutMapping("/api/users/{id}")
	public User updateUser(@RequestHeader("Authorization")String jwt,@RequestBody User user){
		User reqUser=userService.findUserByJwt(jwt);
		
		User updatedUser=userService.updateUser(user, reqUser.getId());
		return updatedUser;
	}
	
	@PutMapping("/api/users/follow/{id2}")
	public User followUser(@RequestHeader("Authorization")String jwt,@PathVariable Integer id2) throws Exception {
		User reqUserId=userService.findUserByJwt(jwt);
		User user=userService.followUser(reqUserId.getId(), id2);
		return user;
	}
	
	@DeleteMapping("/api/users/{id}")
	public String deleteUser(@PathVariable("id") Integer id) throws Exception {
		return "User deleted successfully with id"+id;
	}
	
	
	@GetMapping("/api/users/search")
	public List<User> searchUser(@RequestParam("query") String query){
		List<User> users=userService.searchUser(query);
		return  users;
		
	}
	@GetMapping("/api/users/profile")
	public User getUserFormToken(@RequestHeader("Authorization")String jwt) {
		
		User user=userService.findUserByJwt(jwt);
		user.setPassword(null);
		return user;
	}
	
}
