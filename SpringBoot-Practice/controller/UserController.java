package com.springboot.practic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.practic.model.User;
import com.springboot.practic.repository.UserRepository;
import com.springboot.practic.service.UserService;

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
	public User updateUser(@RequestBody User user,@PathVariable Integer id){
		User reqUser=userService.findUserById(id);
		
		User updatedUser=userService.updateUser(user, reqUser.getId());
		return updatedUser;
	}
	
	@PutMapping("/api/users/{id1}/follow/{id2}")
	public User followUser(@PathVariable Integer id1, @PathVariable Integer id2) throws Exception {
		User reqUserId=userService.findUserById(id1);
		User user=userService.followUser(reqUserId.getId(), id2);
		return user;
	}
	
	@DeleteMapping("/api/users/{id}")
	public String deleteUser(@PathVariable("id") Integer id) throws Exception {
		return "User deleted successfully with id"+id;
	}
	
	
	
}
