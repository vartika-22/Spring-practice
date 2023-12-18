package com.springboot.practic.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Table(name="User")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	Integer id;
	@Column
	String firstName;
	String lastName;
	@Column(nullable = false,unique = true)
	String email;
	String password;
	String gender;
	private List<Integer> followers=new ArrayList<>();
	private List<Integer> followings=new ArrayList<>();
	

	

}
