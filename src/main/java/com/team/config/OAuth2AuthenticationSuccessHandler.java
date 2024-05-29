package com.team.config;



import com.team.service.AccountService;
import com.team.service.CustomerService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;

import java.util.Map;

@Component
public class OAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {


    private final AccountService accountService;
    private final CustomerService customerService;

    public OAuth2AuthenticationSuccessHandler(AccountService accountService, CustomerService customerService) {
        this.accountService = accountService;
        this.customerService = customerService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();

            // Retrieve email and name from OAuth2 user attributes
            String email = (String) attributes.get("email");

            // check email that exist or not
            // if exist response back to sign-in and say already exist email.
            if (accountService.checkEmail(email)){
                response.sendRedirect("http://localhost:3000/sign-in?error=email_exists");
                return;
            }

            // create a customer account with email and password is null
//            accountService.createAccount(email, null);
//            Integer customerID = accountService.findAccountID(email, null).getAccountID();

            // create a customer only with customerID and email
            customerService.createCustomer(null, null, email, null);

            // Redirect to sign-up page after successful OAuth2 authentication
            response.sendRedirect("http://localhost:3000/home-page");
        } else {
            // Handle other types of authentication
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}