package com.team.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler) throws Exception {
        return http
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/").permitAll(); // Allow access to these URLs without authentication
                    auth.anyRequest().authenticated(); // All other requests require authentication
                })
                .oauth2Login(oauth ->
                        oauth.loginPage("http://localhost:3000/sign-in")
                                .successHandler(oAuth2AuthenticationSuccessHandler)
                )
                .build();
    }
}
