package com.ssafy.cb.auth.jwt;

public class JwtProperties {
    public static final String SECRET = "kwonsky";
    public static final int EXPIRATION_TIME = 864000000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
}
