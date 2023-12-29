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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;


import com.springboot.practic.model.Post;
import com.springboot.practic.model.User;
import com.springboot.practic.repository.PostRepository;
import com.springboot.practic.response.ApiResponse;
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
	
	@PostMapping("/api/posts")
	public ResponseEntity<Post> createPost(@RequestHeader("Authorization")String jwt,@RequestBody Post post){
		User userId=userService.findUserByJwt(jwt);
		Post creatPost=postService.createPost(post, userId.getId());
		return new ResponseEntity<>(creatPost,HttpStatus.ACCEPTED);
	}
	@DeleteMapping("/api/posts/{postId}")
	public ResponseEntity<ApiResponse> deletePost(@RequestHeader("Authorization")String jwt,@PathVariable Integer postId){
		User userId=userService.findUserByJwt(jwt);
		String message=postService.deletePost(postId, userId.getId());
		ApiResponse res=new ApiResponse(message,true);
		return new ResponseEntity<ApiResponse>(res,HttpStatus.OK);
	}
	
	@GetMapping("/api/posts/{postId}")
	public ResponseEntity<Post> findPostById(@PathVariable Integer postId){
		Post post=postService.findPostById(postId);
		return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/api/posts/user/{id}")
	public ResponseEntity<List<Post>> findUsersPost(@PathVariable Integer id){
		List<Post> post=postService.findPostByUserId(id);
		return new ResponseEntity<List<Post>>(post,HttpStatus.OK);
	}
	
	@GetMapping("/api/posts")
	public ResponseEntity<List<Post>> findAllPost(){
		List<Post> post=postService.findAllPost();
		return new ResponseEntity<List<Post>>(post,HttpStatus.OK);
	}
	
	@PutMapping("/api/posts/save/{postId}")
	public ResponseEntity<Post> savedPost(@PathVariable Integer postId,@RequestHeader("Authorization")String jwt){
		User userId=userService.findUserByJwt(jwt);
		Post post=postService.savePost(postId, userId.getId());
		return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
	}	
	
	@PutMapping("/api/posts/like/{postId}")
	public ResponseEntity<Post> likedPost(@PathVariable Integer postId,@RequestHeader("Authorization")String jwt){
		User userId=userService.findUserByJwt(jwt);
		Post post=postService.likePost(postId, userId.getId());
		return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
	}
}
