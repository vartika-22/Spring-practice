package com.spring.log.service;

import java.util.List;

import com.spring.log.model.Chat;
import com.spring.log.model.User;

public interface ChatService {

	public Chat createChat(User regUser,User user);
	public Chat findChatById(Integer chatId);
	public List<Chat> findUsersChat(Integer userId);
	public List<Chat> getAllChats();
}
