package com.spring.log.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.log.model.Chat;
import com.spring.log.model.User;
import com.spring.log.repository.ChatRepository;

import jakarta.transaction.Transactional;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatRepository chatRepository;
	@Autowired
	private UserService userService;
	
	
	@Override
	@Transactional
	public Chat createChat(User regUser, User user) {
		Chat chatExist=chatRepository.findChatByUsersId(regUser, user);
		if(chatExist!=null) {
			return chatExist;
		}
		Chat chat=new Chat();
		chat.getUser().add(user);
		chat.getUser().add(regUser);
		chat.setTimestamp(LocalDateTime.now());
		
		return chatRepository.save(chat);
	}

	@Override
	public Chat findChatById(Integer chatId) {
		Optional<Chat> opt=chatRepository.findById(chatId);
		try {
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return opt.get();
	}

	@Override
	public List<Chat> findUsersChat(Integer userId) {
		
		return chatRepository.findByUserId(userId);
	}

	@Override
	public List<Chat> getAllChats() {
		// TODO Auto-generated method stub
		return chatRepository.findAll();
	}

}
