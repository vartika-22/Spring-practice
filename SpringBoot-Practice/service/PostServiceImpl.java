package com.springboot.practic.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.practic.model.Post;
import com.springboot.practic.model.User;
import com.springboot.practic.repository.PostRepository;
import com.springboot.practic.repository.UserRepository;

@Service
public class PostServiceImpl implements PostService{
	
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepository;

	@Override
	public Post createPost(Post post, Integer id) {
		User user=userService.findUserById(id);
		Post newPost=new Post();
		newPost.setCaption(post.getCaption());
		newPost.setImageUrl(post.getImageUrl());
		post.getCreatedAt();
		newPost.setCreatedAt(LocalDateTime.now());
		newPost.setVideoUrl(post.getVideoUrl());
		newPost.setUser(user);
		
		postRepository.save(newPost);
		return newPost;
	}

	@Override
	public String deletePost(Integer postId) {
		Post post=findPostById(postId);
		postRepository.delete(post);
		return "Post deleted Successfully";
	}

	@Override
	public List<Post> findPostByUserId(Integer id) {
		return postRepository.findPostByUserId(id);
	}

	@Override
	public Post findPostById(Integer postId) {
		Optional<Post> post=postRepository.findById(postId);
		if(post.isEmpty()) {
			System.out.println("Post not found ");
		}
		return post.get();
	}

	@Override
	public List<Post> findAllPost() {
		return postRepository.findAll();
	}

	@Override
	public Post savePost(Integer postId, Integer id) {
		Post post=findPostById(postId);
		User user =userService.findUserById(id);
		if(user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
		}else {
			user.getSavedPost().add(post);
		}
		userRepository.save(user);
		return post;
	}

	@Override
	public Post likePost(Integer postId, Integer id) {
		Post post=findPostById(postId);
		User user =userService.findUserById(id);
		
		if(post.getLiked().contains(user)) {
			post.getLiked().remove(user);
		}
		else {
			post.getLiked().add(user);
		}
		postRepository.save(post);
		return post;
	}

}
