package com.team.config;

import com.team.service.AccountService;
import com.team.service.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

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

                // check whether customer login with Google account before
                if (accountService.checkAccount(email, password)){
                    response.sendRedirect("http://localhost:3000/home-page?role=CUS");
                    return;
                }

                // customer can't login with Google that used for sign up
                if (accountService.checkEmail(email)) {
                    response.sendRedirect("http://localhost:3000/sign-in?error=email_exists");
                    return;
                }

                // create an account with attributes from Google account
                customerService.createCustomer(name, null, email, password);
                response.sendRedirect("http://localhost:3000/home-page?role=CUS");
            } else {
                super.onAuthenticationSuccess(request, response, authentication);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }
}
