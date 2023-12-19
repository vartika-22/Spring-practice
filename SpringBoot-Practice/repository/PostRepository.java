package com.springboot.practic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.practic.model.Post;

@Repository

public interface PostRepository extends JpaRepository<Post, Integer>{

	@Query("select p from Post p where p.user.id=:id")
	List<Post> findPostByUserId(Integer id);
}
