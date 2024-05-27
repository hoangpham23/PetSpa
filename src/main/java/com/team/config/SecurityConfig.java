package com.team.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler) throws Exception {
        return http
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/home-page/", "/sign-in", "/forgotpassword/").permitAll(); // Allow access to these URLs without authentication
                    auth.anyRequest().authenticated(); // All other requests require authentication
                })
                // change the default page login with google
                .oauth2Login(oauth ->
                        oauth.loginPage("http://localhost:3000/sign-in2")
                                .successHandler(oAuth2AuthenticationSuccessHandler)
                                // successful login with google redirect to home-page
                )
                .csrf(csrf -> csrf.disable())
                .build();
    }
}
