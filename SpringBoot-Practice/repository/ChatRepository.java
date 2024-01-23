package com.spring.log.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.log.model.Chat;
import com.spring.log.model.User;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer>{

	public List<Chat> findByUserId(Integer userId);
	@Query("select c from Chat c where :user Member of c.user And :reqUser Member of c.user")
	public Chat findChatByUsersId(@Param("user") User user,@Param("reqUser")User reqUser);
	
}
