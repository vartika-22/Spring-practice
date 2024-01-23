package com.spring.log.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.log.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

	List<Message> findByChatIdOrderByTimestampDesc(Integer chatId);

}
