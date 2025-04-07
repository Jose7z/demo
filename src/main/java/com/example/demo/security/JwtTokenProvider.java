package com.example.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import java.nio.charset.StandardCharsets;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long validityInMilliseconds = 3600000; // 1 hour default

    private Key key;

    @PostConstruct
    protected void init() {
        logger.debug("Initializing JWT key");
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        logger.debug("JWT key initialized successfully");
    }

    public String generateToken(String username) {
        logger.debug("Creating JWT token for user: {}", username);
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        String token = Jwts.builder()
            .setSubject(username)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(key)
            .compact();

        logger.debug("JWT token created successfully for user: {}", username);
        return token;
    }

    public String getUsername(String token) {
        logger.debug("Extracting username from token");
        try {
            String username = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
            logger.debug("Username extracted successfully: {}", username);
            return username;
        } catch (Exception e) {
            logger.error("Error extracting username from token", e);
            throw e;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            logger.debug("Token validation successful");
            return true;
        } catch (Exception e) {
            logger.error("Token validation failed", e);
            return false;
        }
    }
}