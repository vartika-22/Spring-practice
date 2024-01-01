package com.spring.log;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.spring.log")
public class SpringSocialMediaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringSocialMediaApplication.class, args);
	}

}
