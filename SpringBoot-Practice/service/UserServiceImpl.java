package com.spring.log.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.log.config.JwtProvider;
import com.spring.log.model.User;
import com.spring.log.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public User registerUser(User user) {
		User newUser=new User();
		newUser.setId(user.getId());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(user.getPassword());
		newUser.setGender(user.getGender());
		newUser.setPassword(user.getPassword());
		User savedUser=userRepository.save(newUser);
		return savedUser;
	}

	@Override
	public User findUserById(Integer id) {
		Optional<User> user=userRepository.findById(id);
		try {
			if(user.isPresent()) {
				return user.get();
			}
		}catch(NullPointerException e) {
			e.printStackTrace();
		}
		return user.get();
	}

	@Override
	public User findByEmail(String email) {
		User user=userRepository.findByEmail(email);
		return user;
	}

	@Override
	public User followUser(Integer reqUserId, Integer id2) {
		
		User reqUser=findUserById(reqUserId);
		User user2=findUserById(id2);
		user2.getFollowers().add(reqUser.getId());
		reqUser.getFollowings().add(user2.getId());
		userRepository.save(reqUser);
		userRepository.save(user2);
		return reqUser;
	}

	@Override
	public User updateUser(User user, Integer id) {
	
		Optional<User> user1=userRepository.findById(id);
		
		if(user1.isEmpty()) {
			System.out.println("User does not exist");
		}
		
		User oldUser=user1.get();
		if(user.getFirstName()!=null) {
			oldUser.setFirstName(user.getFirstName());
		}
		if(user.getLastName()!=null) {
			oldUser.setLastName(user.getLastName());
		}
		if(user.getEmail()!=null) {
			oldUser.setEmail(user.getEmail());
		}
		if(user.getPassword()!=null) {
			oldUser.setPassword(user.getPassword());
		}
		if(user.getGender()!=null) {
			oldUser.setGender(user.getGender());
		}
		oldUser.setImageUrl(user.getImageUrl());
		User updateUser=userRepository.save(oldUser);
		return updateUser;
	}

	@Override
	public List<User> searchUser(String query) {
		
		return userRepository.searchUser(query);
	}

	@Override
	public User findUserByJwt(String jwt) {
		String email=JwtProvider.getEmailFromJwtToken(jwt);
		User user=userRepository.findByEmail(email);
		return user;
	}
}

	
