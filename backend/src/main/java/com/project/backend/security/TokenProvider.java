package com.project.backend.security;

import com.project.backend.accounts.repository.entity.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

//create : jwt 라이브러리를 이용해 jwt 토큰 생성
//validateAndGetUserId : 토큰을 디코딩 및 파싱하고 토큰의 위조 여부 확인한 후 subject(사용자 id)를 리턴
@Slf4j
@Service
public class TokenProvider {
    private static final String SECRET_KEY = "d1239f9e4f0a1b2e555c082579cb859b0943345d31f74344624b2e10edc16f2394e7ab65768dd83650d849fcdee3c8bd61c92b9d7f0abb022e4f4ae9a59bca63";

    public String create(Users user){
        //기한은 지금부터 1일로 설정
        Date expiryDate = Date.from(
                Instant.now().plus(1, ChronoUnit.DAYS));
        //JWT 토큰 생성
        return Jwts.builder()
                //header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                //payload에 들어갈 내용
                .setSubject(String.valueOf(user.getId()))//sub
                .setIssuer("standUpSeoul")//iss
                .setIssuedAt(new Date())//iat
                .setExpiration(expiryDate)//exp
                .compact();
    }

    public String validateAndGetUserId(String token){
        /* parseClaimsJws 메서드가 Base64로 디코딩 및 파싱
        * 헤더와 페이로드를 setStringKey로 넘어온 시크릿을 이용해 서명한 후 token의 서명과 비교
        * 위조되지 않았다면 페이로드(Claims) 리턴, 위조라면 예외를 날림
        * 그중 우리는 userId가 필요하므로 getBody 를 부른다.*/
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}
