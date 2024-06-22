package com.team.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final String[] PUBLIC_ENDPOINTS = {"/sign-in", "/sign-in/verify", "/sign-up"};
    private final String[] ADMIN_ENDPOINTS = {"/admin/employees", "/admin/create-employee", "/admin/employees/"};

    @Value("${SIGNER_KEY}")
    private String signerKey;

//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http, OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler) throws Exception {
//        return http
//                .authorizeHttpRequests(auth -> {
////                    auth.requestMatchers("/payment").hasRole("CUS");
//                    auth.anyRequest().permitAll(); // Allow access to these URLs without authentication
////                    auth.anyRequest().authenticated(); // All other requests require authentication
//                })
//                // change the default page login with google
//                .oauth2Login(oauth ->
//                        oauth.loginPage("http://localhost:3000/sign-in")
//                                .successHandler(oAuth2AuthenticationSuccessHandler)
//                                // successful login with google redirect to home-page
//                )
//                .csrf(csrf -> csrf.disable())
//                .build();
//    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler) throws Exception {
        httpSecurity.authorizeHttpRequests(request ->
                request.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
                        .requestMatchers(ADMIN_ENDPOINTS).hasRole("AD")
                        .anyRequest().authenticated()
        );
        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter()))
        );
        httpSecurity.oauth2Login(oauth2 ->
                oauth2.loginPage("http://localhost:3000/sign-in")
                        .successHandler(oAuth2AuthenticationSuccessHandler)
        );

        httpSecurity.csrf(AbstractHttpConfigurer::disable); // allow other Cors connection
        return httpSecurity.build();
    }


    // decode json token
    @Bean
    JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

    // this function change the hasAuthority from SCOPE_ into ROLE_
    // after change, can you hasRole instead of hasAuthority
    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return converter;
    }

}
