package com.spring.log.service;

import java.util.List;

import com.spring.log.model.Reels;
import com.spring.log.model.User;

public interface ReelsService {

	public Reels createReel(Reels reel,User user);
	public List<Reels> findAllReels();
	public List<Reels> findUsersReel(Integer userId);
}
