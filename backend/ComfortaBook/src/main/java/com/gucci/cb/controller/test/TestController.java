package com.gucci.cb.controller.test;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
@Api(tags = {"Test"})
public class TestController {
	
	@ApiOperation(value = "Test Message GET Method", response = String.class)
	@GetMapping("/g")
	public ResponseEntity<String> testGET(@RequestParam String s) {
		System.out.println("Test Message(GET) : " + s);
		return new ResponseEntity<String>(s, HttpStatus.OK);
	}
	
	@ApiOperation(value = "Test Message POST Method", response = String.class)
	@PostMapping("/p")
	public ResponseEntity<String> testPOST(@RequestParam String s) {
		System.out.println("Test Message(POST) : " + s);
		return new ResponseEntity<String>(s, HttpStatus.OK);
	}
	
	
	
	
}
