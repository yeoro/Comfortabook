package com.gucci.cb.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

//http://localhost:8090/cb/swagger-ui.html

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/book")
public class BookController {
	
	@ApiOperation(value = "Swagger Test", response = String.class)
	@GetMapping
	public String retrieveQnA() throws Exception {
		return "hello world!";
	}
	
}
