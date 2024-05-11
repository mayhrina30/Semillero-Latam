package com.semillero.ecosistema.jwt;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomerDetailsService customerDetailsService;

    Claims claims = null;

    private String username = null;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().matches("/user/register|/user/login|/publication/actives|/publication/get|/publication/update-view|/category|/provider/accepted-by-category|/provider/accepted|/provider/search|/user/expiration")) {
            filterChain.doFilter(request,response);
        } else {
            String authorizationHeader = request.getHeader("Authorization");
            String token = null;

            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                token = authorizationHeader.substring(7);
                username = jwtUtil.extractUsername(token);
                claims = jwtUtil.extractAllClaims(token);
                setAuthentication(claims);
            }
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = customerDetailsService.loadUserByUsername(username);
                System.out.println(userDetails);
                if (jwtUtil.validateToken(token, userDetails)) {
                   UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    new WebAuthenticationDetailsSource().buildDetails(request);
                   SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
           filterChain.doFilter(request, response);
        }
    }
    public Boolean isAdmin(){
        return  "ADMIN".equalsIgnoreCase((String) claims.get("role"));
    }

    public Boolean isUser(){
        return  "USER".equalsIgnoreCase((String) claims.get("role"));
    }

    public String getCurrentUser(){
       return username;
   }
    private void setAuthentication(Claims claims) {
        if (claims.getSubject() != null) {
            Object authoritiesObj = claims.get("authorities");
            if (authoritiesObj instanceof List<?> list) {
                List<SimpleGrantedAuthority> authorities = list.stream()
                        .filter(obj -> obj instanceof String)
                        .map(obj -> new SimpleGrantedAuthority((String) obj))
                        .toList();

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(claims.getSubject(), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
    }
}