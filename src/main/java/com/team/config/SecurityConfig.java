package com.team.config;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.team.model.Accounts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Date;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${SIGNER_KEY}")
    private String SIGNER_KEY;

    private final String[] PUBLIC_ENDPOINTS = {"/sign-in", "/sign-in/verify", "/sign-up",
            "/home-page", "/sign-up/verify-otp", "/forgotpassword",
            "/forgotpassword/verify-otp", "/home-page/{serviceName}"
    };
    private final String[] CUSTOMER_ENDPOINTS = {"/insert-pet-info", "/choose-pet",
            "/choose-service", "/appointment/time", "/payment",
            "/payment-history"
    };

    private final String[] EMPLOYEE_ENDPOINTS = {"/employee/schedule"};

    private final String[] ADMIN_ENDPOINTS = {"/admin/employees", "/admin/create-employee", "/admin/employees/{id}"};

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
        httpSecurity.oauth2Login(oauth2 ->
                        oauth2.loginPage("http://localhost:3000/sign-in")
                                .successHandler(oAuth2AuthenticationSuccessHandler)
//                        .userInfoEndpoint(userInfoEndpoint ->
//                                userInfoEndpoint.oidcUserService(this.oidcUserService())
//                        )
//                        .successHandler(this.authenticationSuccessHandler())
        );
        httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(request ->
                        request
                                .requestMatchers(CUSTOMER_ENDPOINTS).hasRole("CUS")
                                .requestMatchers(EMPLOYEE_ENDPOINTS).hasRole("EM")
                                .requestMatchers(ADMIN_ENDPOINTS).hasRole("AD")
                                .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                                .anyRequest().authenticated()
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
