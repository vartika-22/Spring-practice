package com.spring.log.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.log.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
