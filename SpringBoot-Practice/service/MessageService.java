package com.spring.log.service;

import java.util.List;

import com.spring.log.model.Message;
import com.spring.log.model.User;

public interface MessageService {
	public Message createMessage(User user,Integer chatId,Message req);

	List<Message> findChatsMessages(Integer chatId);

}
