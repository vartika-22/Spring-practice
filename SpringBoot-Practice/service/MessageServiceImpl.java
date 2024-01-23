package com.spring.log.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.log.model.Chat;
import com.spring.log.model.Message;
import com.spring.log.model.User;
import com.spring.log.repository.ChatRepository;
import com.spring.log.repository.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	private ChatRepository chatRepository;
	@Autowired
	private ChatService chatService;
	@Override
	public Message createMessage(User user, Integer chatId, Message req) {
		Chat chat=chatService.findChatById(chatId);
		if(chat==null) {
			return null;
		}
		Message message=new Message();
		message.setContent(req.getContent());
		message.setImage(req.getImage());
//		message.setChat(chat);
		message.setTimestamp(LocalDateTime.now());
		message.setUser(user);
		Message savedMessage=messageRepository.save(message);
		chat.getMessages().add(savedMessage);
		chatRepository.save(chat);
		return savedMessage;
	}
	@Override
    public List<Message> findChatsMessages(Integer chatId) {
        return messageRepository.findByChatIdOrderByTimestampDesc(chatId);
    }

}
