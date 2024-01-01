package com.spring.log.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.log.model.Comment;
import com.spring.log.model.Post;
import com.spring.log.model.User;
import com.spring.log.repository.CommentRepository;
import com.spring.log.repository.PostRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private PostService postService;
	@Autowired
	private UserService userService;
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private PostRepository postRepository;
	
	
	@Override
	public Comment createComment(Comment comment, Integer postId, Integer userid) {
		User user=userService.findUserById(userid);
		Post post=postService.findPostById(postId);
		comment.setUser(user);
		comment.setContent(comment.getContent());
		comment.setCreatedat(LocalDateTime.now());
		Comment saveComment=commentRepository.save(comment);
		post.getComments().add(saveComment);
		postRepository.save(post);
		return saveComment;
	}

	@Override
	public Comment findCommentById(Integer commentId) {
		Optional<Comment> opt=commentRepository.findById(commentId);
		try {
			
		}catch (NullPointerException e) {
			System.out.println("comment does not exist");
		}
		return opt.get();
	}

	@Override
	public Comment likeComment(Integer commentId, Integer userId) {
		Comment comment=findCommentById(commentId);
		User user=userService.findUserById(userId);
		if(!comment.getLiked().contains(user)) {
			comment.getLiked().add(user);
		}else {
			comment.getLiked().remove(user);
		}
		return commentRepository.save(comment);
	}

}
