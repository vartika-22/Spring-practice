package com.springboot.practic.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table
@Getter
@Setter


public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Integer postid;
	private String caption;
	private String imageUrl;
	private String videoUrl;
	
	@ManyToOne
	private User user;
	private LocalDateTime createdAt;
	@OneToMany
	private List<User> liked=new ArrayList<>();
	

}
