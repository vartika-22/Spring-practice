package com.spring.log.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reels {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String title;
	private String videourl;
	@ManyToOne
	private User user;
	private LocalDateTime createdAt;
	

}
