package com.spring.log.service;

import com.spring.log.model.Comment;

public interface CommentService {
	
	public Comment createComment(Comment comment,Integer postId,Integer userid);

	public Comment findCommentById(Integer commentId);

	public Comment likeComment(Integer commentId,Integer userId);
	
}
