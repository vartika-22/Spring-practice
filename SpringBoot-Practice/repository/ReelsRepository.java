package com.spring.log.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.log.model.Reels;

@Repository
public interface ReelsRepository extends JpaRepository<Reels, Integer> {

	public List<Reels> findByUserId(Integer userId);
}
