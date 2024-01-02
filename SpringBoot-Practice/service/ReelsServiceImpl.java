package com.spring.log.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.log.model.Reels;
import com.spring.log.model.User;
import com.spring.log.repository.ReelsRepository;

@Service
public class ReelsServiceImpl  implements ReelsService{

	@Autowired
	private ReelsRepository reelsRepository;
	@Autowired
	private UserService userService;
	
	
	
	@Override
	public Reels createReel(Reels reel, User user) {
		Reels createReel=new Reels();
		createReel.setTitle(reel.getTitle());
		createReel.setUser(user);
		createReel.setCreatedAt(LocalDateTime.now());
		createReel.setVideourl(reel.getVideourl());
		
		return reelsRepository.save(createReel);
	}

	@Override
	public List<Reels> findAllReels() {
		return reelsRepository.findAll();
	}

	@Override
	public List<Reels> findUsersReel(Integer userId) {
		userService.findUserById(userId);
		
		return reelsRepository.findByUserId(userId) ;
	}

}
