//package com.gucci.cb.controller.social;
//
//import java.util.HashMap;
//
//import javax.servlet.http.HttpSession;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import com.gucci.cb.service.social.KakaoAPIService;
//
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@Controller
//@RequestMapping("/social/login")
//public class SocialController {
//
////    private final Environment env;
////    private final RestTemplate restTemplate;
////    private final Gson gson;
////    private final KakaoService kakaoService;
////
////    @Value("${spring.url.base}")
////    private String baseUrl;
////
////    @Value("${spring.social.kakao.client_id}")
////    private String kakaoClientId;
////
////    @Value("${spring.social.kakao.redirect}")
////    private String kakaoRedirect;
////
////    /**
////     * 카카오 로그인 페이지
////     */
////    @GetMapping
////    public ModelAndView socialLogin(ModelAndView mav) {
////
////        StringBuilder loginUrl = new StringBuilder()
////                .append(env.getProperty("spring.social.kakao.url.login"))
////                .append("?client_id=").append(kakaoClientId)
////                .append("&response_type=code")
////                .append("&redirect_uri=").append(baseUrl).append(kakaoRedirect);
////        mav.addObject("loginUrl", loginUrl);
////        mav.setViewName("social/login");
////        return mav;
////    }
////
////    /**
////     * 카카오 인증 완료 후 리다이렉트 화면
////     */
////    @GetMapping(value = "/kakao")
////    public ModelAndView redirectKakao(ModelAndView mav, @RequestParam String code) {
////        mav.addObject("authInfo", kakaoService.getKakaoTokenInfo(code));
////        mav.setViewName("social/redirectKakao");
////        return mav;
////    }
////    
//    
//	private final KakaoAPIService kakao;
//	
//    @RequestMapping(value="/")
//    public String index() {
//        
//        return "index";
//    }
//    
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
//}