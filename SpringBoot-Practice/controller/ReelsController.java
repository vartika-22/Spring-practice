package com.spring.log.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.spring.log.model.Reels;
import com.spring.log.model.User;
import com.spring.log.service.ReelsService;
import com.spring.log.service.UserService;

@RestController
public class ReelsController {

	@Autowired
	private ReelsService reelsService;
	@Autowired
	private UserService userservice;
	
	
	@PostMapping("/api/reels")
	public Reels createReels(@RequestBody Reels reels,@RequestHeader("Authorization")String jwt) {
		User user=userservice.findUserByJwt(jwt);
		Reels createdReel=reelsService.createReel(reels,user);
		return createdReel;
	}
	
	@GetMapping("/api/reels")
	public List<Reels> findAllReels() {
		List<Reels> reel=reelsService.findAllReels();
		return reel;
	}
	
	
	@GetMapping("/api/reels/user/{userId}")
	public List<Reels> findReelsByUserId(@PathVariable Integer userId) {
		List<Reels> reel=reelsService.findUsersReel(userId);
		return reel;
	}
	
	
}

