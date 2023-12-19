package com.springboot.practic.service;

import java.util.List;

import com.springboot.practic.model.Post;

public interface PostService {
	
	Post createPost(Post post,Integer id);
	String deletePost(Integer postId);
	List<Post> findPostByUserId(Integer id);
	Post findPostById(Integer postId);
	List<Post> findAllPost();
	Post savePost(Integer postId,Integer id);
	Post likePost(Integer postId,Integer id);

}
