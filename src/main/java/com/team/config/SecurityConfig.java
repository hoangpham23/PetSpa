package com.team.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;
import java.util.Arrays;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final String[] PUBLIC_ENDPOINTS = {"/sign-in", "/sign-in/verify", "/sign-up",
            "/home-page", "/sign-up/verify-otp", "/forgotpassword",
            "/forgotpassword/verify-otp", "/home-page/**", "/uploads/**", "/payment/**", "/send-email"
    };
    private final String[] CUSTOMER_ENDPOINTS = {"/insert-pet-info", "/choose-pet",
             "/appointment/**", "/payment", "/choose-service",
            "/payment-history",
    };

    private final String[] EMPLOYEE_ENDPOINTS = {"/employee/schedule", "/customer-feedback-for-employee", "/manage-appointment"};

    private final String[] ADMIN_ENDPOINTS = {"/admin/employees", "/admin/create-employee", "/admin/employees/{id}",
            "/manage-appointment", "/add-service", "/weekly-revenue", "/admin/updateMaxBooking",
            "/admin/getMaxBooking"

    };

    @Value("${SIGNER_KEY}")
    private String signerKey;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler) throws Exception {
        httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(request ->
                        request
                                .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                                .requestMatchers(CUSTOMER_ENDPOINTS).hasRole("CUS")
                                .requestMatchers(EMPLOYEE_ENDPOINTS).hasRole("EM")
                                .requestMatchers(ADMIN_ENDPOINTS).hasRole("AD")
                                .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 ->
                        oauth2.loginPage("http://localhost:3000/sign-in")
                                .successHandler(oAuth2AuthenticationSuccessHandler)
                )
                .oauth2Login(oauth2 ->
                        oauth2.loginPage("http://localhost:3000/sign-in")
                                .successHandler(oAuth2AuthenticationSuccessHandler)
                )
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwtConfigurer ->
                                jwtConfigurer.decoder(jwtDecoder())
                                        .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                )
                .csrf(AbstractHttpConfigurer::disable); // allow other Cors connection
        return httpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // or use Collections.singletonList() if you only have one origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //     decode json token
    @Bean
    JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

    //
//     this function change the hasAuthority from SCOPE_ into ROLE_
//     after change, can you hasRole instead of hasAuthority
    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return converter;
    }

}
