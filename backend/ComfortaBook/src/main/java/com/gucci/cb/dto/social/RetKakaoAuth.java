package com.gucci.cb.dto.social;

import lombok.Getter;
import lombok.Setter;

/**
 * 카카오 token api 연동 시 매핑을 위한 모델 
 *
 */


@Getter
@Setter
public class RetKakaoAuth {
    private String access_token;
    private String token_type;
    private String refresh_token;
    private long expires_in;
    private String scope;
}
