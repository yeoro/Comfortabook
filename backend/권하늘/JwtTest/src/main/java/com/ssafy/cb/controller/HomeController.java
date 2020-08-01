//package com.ssafy.cb.controller;
//
//import java.util.HashMap;
//
//import javax.servlet.http.HttpSession;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import com.ssafy.cb.service.KakaoAPIService;
// 
//@Controller
//
//public class HomeController {
//	
//	@Autowired
//	private KakaoAPIService kakao;
//	
//    @RequestMapping(value="/")
//    public String index() {
//        
//        return "index";
//    }
//    
//    @RequestMapping(value="/login")
//    public String login(@RequestParam("code") String code, HttpSession session) {
//    	String accessToken = kakao.getAccessToken(code);
////    	String kakaoUri = kakao.getAuthorizationUri(session);
//    	
//    	
//        System.out.println("code : " + code);
//        System.out.println("controller access_token : " + accessToken);
//        
//        HashMap<String, Object> userInfo = kakao.getUserInfo(accessToken);
//        System.out.println("login Controller : " + userInfo);
//        
//        if(userInfo.get("email") != null) {
//        	session.setAttribute("userId", userInfo.get("email"));
//        	session.setAttribute("access_Token", accessToken);
//        }
//        
//        return "index";
//    }
//
//    @RequestMapping(value="/logout")
//    public String logout(HttpSession session) {
//        kakao.kakaoLogout((String)session.getAttribute("access_Token"));
//        System.out.println("logout token : " + session.getAttribute("access_Token"));
//        session.removeAttribute("access_Token");
//        session.removeAttribute("userId");
//        return "index";
//    }
//    
//    @RequestMapping(value="/unlink")
//    public String unlink(HttpSession session) {
//        kakao.kakaoUnlink((String)session.getAttribute("access_Token"));
//        System.out.println("logout token : " + session.getAttribute("access_Token"));
//        session.removeAttribute("access_Token");
//        session.removeAttribute("userId");
//        return "index";
//    }
//
//}
//
