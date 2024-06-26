package com.team.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.dto.AccountDTO;
import com.team.dto.CustomerDTO;
import com.team.service.AccountService;
import com.team.service.CustomerService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Component
public class OAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final Logger logger = LoggerFactory.getLogger(OAuth2AuthenticationSuccessHandler.class);
    private final AccountService accountService;
    private final CustomerService customerService;

    @Autowired
    public OAuth2AuthenticationSuccessHandler(AccountService accountService, CustomerService customerService) {
        this.accountService = accountService;
        this.customerService = customerService;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {
        try {
            if (authentication instanceof OAuth2AuthenticationToken oauthToken) {
                Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();
                String email = (String) attributes.get("email");
                String password = (String) attributes.get("sub");
                String name = (String) attributes.get("name");

                AccountDTO accountDTO = accountService.checkLogin(email, password);
                CustomerDTO customerDTO;

                if (accountDTO != null) {
                    customerDTO = customerService.getCustomerByAccountID(accountDTO.getAccountID(), accountDTO.getRole(), accountDTO.getToken());
                } else {
                    if (accountService.checkEmail(email)) {
                        response.sendRedirect("http://localhost:3000/sign-in?error=email_exists");
                        return;
                    }

                    customerService.createCustomer(name, null, email, password);
                    accountDTO = accountService.checkLogin(email, password);
                    if (accountDTO == null) {
                        response.sendRedirect("http://localhost:3000/sign-in?error=creation_failed");
                        return;
                    }
                    customerDTO = customerService.getCustomerByAccountID(accountDTO.getAccountID(), accountDTO.getRole(), accountDTO.getToken());
                }

                // Combine all customer data into a JSON object
                String combinedData = createCombinedCookieValue(customerDTO);

                // Add the combined data to a single secure cookie
                addSecureCookie(response, "customerData", combinedData);

                response.sendRedirect("http://localhost:3000/home-page");
            } else {
                super.onAuthenticationSuccess(request, response, authentication);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

    private String createCombinedCookieValue(CustomerDTO customerDTO) {
        try {
            Map<String, String> customerData = new HashMap<>();
            customerData.put("customerID", String.valueOf(customerDTO.getCustomerID()));
            customerData.put("customerName", customerDTO.getCustomerName());
            customerData.put("email", customerDTO.getEmail());
            customerData.put("phoneNumber", customerDTO.getPhoneNumber() == null ? "null" : customerDTO.getPhoneNumber());
            customerData.put("role", customerDTO.getRole());
            customerData.put("numberOfPets", String.valueOf(customerDTO.getNumberOfPets()));
            customerData.put("token", customerDTO.getToken());

            return URLEncoder.encode(new ObjectMapper().writeValueAsString(customerData), StandardCharsets.UTF_8.toString());
        } catch (JsonProcessingException | UnsupportedEncodingException e) {
            logger.error("Error creating combined cookie value", e);
            return "";
        }
    }

    private void addSecureCookie(HttpServletResponse response, String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(false);
        cookie.setSecure(true); // Use only in HTTPS
        cookie.setMaxAge(3600);
        cookie.setPath("/");
        response.addCookie(cookie);
    }


}
