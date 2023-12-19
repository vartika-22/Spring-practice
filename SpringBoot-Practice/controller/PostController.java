package com.springboot.practic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.practic.model.Post;
import com.springboot.practic.model.User;
import com.springboot.practic.repository.PostRepository;
import com.springboot.practic.service.PostService;
import com.springboot.practic.service.UserService;

@RestController
public class PostController {
	@Autowired
	PostService postService;
	@Autowired
	PostRepository postRepository;
	@Autowired
	UserService userService;
	
	@PostMapping("/api/users/{userId}/posts")
	public Post createPost(@RequestBody Post post,@PathVariable Integer userId){
		User user=userService.findUserById(userId);
		Post creatPost=postService.createPost(post,user.getId());
		return creatPost;
	}
	@DeleteMapping("/api/posts/{postId}")
	public String deletePost(@PathVariable Integer postId){
		
		String message=postService.deletePost(postId);
		
		return "deleted Successfully";
	}
	
	@GetMapping("/api/posts/{postId}")
	public Post findPostById(@PathVariable Integer postId){
		Post post=postService.findPostById(postId);
		return post;
	}
	
	@GetMapping("/api/posts/user/{id}")
	public List<Post> findUsersPost(@PathVariable Integer id){
		List<Post> post=postService.findPostByUserId(id);
		return post;
	}
	
	@GetMapping("/api/posts")
	public List<Post> findAllPost(){
		List<Post> post=postService.findAllPost();
		return post;
	}
	
	@PutMapping("/api/users/{userId}/posts/save/{postId}")
	public Post savedPost(@PathVariable Integer postId,@PathVariable Integer userId){
		User user=userService.findUserById(userId);
		Post post=postService.savePost(postId, user.getId());
		return post;
	}	
	
	@PutMapping("/api/users/{userId}/posts/like/{postId}")
	public Post likedPost(@PathVariable Integer postId,@PathVariable Integer userId){
		User user=userService.findUserById(userId);
		Post post=postService.likePost(postId, user.getId());
		return post;
	}
}
