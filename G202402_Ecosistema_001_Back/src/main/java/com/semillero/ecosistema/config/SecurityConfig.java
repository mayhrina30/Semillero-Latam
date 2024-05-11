package com.semillero.ecosistema.config;

import com.semillero.ecosistema.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider authProvider;

    private final JwtFilter jwtFilter;
    private static final String ROLE_ADMIN = "ADMIN";
    private static final String ROLE_USER = "USER";
    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/user/login").permitAll()
                        .requestMatchers("/user/register").permitAll()
                        .requestMatchers("/image/upload/publication").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/image/upload/provider").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/image/delete").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/image/edit").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/user/update").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/user/me").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/user/delete").hasRole(ROLE_ADMIN)
                        .requestMatchers("/publication/get-all").hasRole(ROLE_ADMIN)
                        .requestMatchers("/publication/actives").permitAll()
                        .requestMatchers("/publication/get").permitAll()
                        .requestMatchers("/publication/create").hasRole(ROLE_ADMIN)
                        .requestMatchers("/publication/update").hasRole(ROLE_ADMIN)
                        .requestMatchers("/publication/delete").hasRole(ROLE_ADMIN)
                        .requestMatchers("/publication/update-view").permitAll()
                        .requestMatchers("/category").permitAll()
                        .requestMatchers("/province/delete").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/province/all").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/province/create").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/province/get").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/province/update").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/country/all").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/country/create").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/country/get").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/country/update").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/country/delete").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/provider/create").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/provider/update").hasAnyRole(ROLE_USER,ROLE_ADMIN)
                        .requestMatchers("/provider/get-all").hasRole(ROLE_ADMIN)
                        .requestMatchers("/provider/get").hasAnyRole(ROLE_USER, ROLE_ADMIN)
                        .requestMatchers("/provider/accepted").permitAll()
                        .requestMatchers("/user/expiration").permitAll()
                        .requestMatchers("/provider/accepted-by-category").permitAll()
                        .requestMatchers("/provider/update-state").hasRole(ROLE_ADMIN)
                        .requestMatchers("/email/sendHTML").hasRole(ROLE_ADMIN)
                        .requestMatchers("/provider/search").permitAll()
                        .requestMatchers("/provider/dashboard-info").hasRole(ROLE_ADMIN)
                        .requestMatchers("/provider/location").hasAnyRole(ROLE_USER, ROLE_ADMIN)
                        .requestMatchers("/location").hasAnyRole(ROLE_USER, ROLE_ADMIN)

                        .anyRequest().authenticated())
                .sessionManagement(sessionManager-> sessionManager
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
