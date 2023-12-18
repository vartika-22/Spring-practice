package com.springboot.practic.service;

import com.springboot.practic.model.User;

public interface UserService {
	
	public  User registerUser(User user);
	public User findUserById(Integer id) ;
	public User findByEmail(String email);
	public User followUser(Integer id1,Integer id2);
	public User updateUser(User user,Integer id);
	

}
