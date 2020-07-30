package com.ssafy.cb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class JwtHomeController {
	
	@GetMapping("index")
	public String index() {
		return "index";
	}
}
