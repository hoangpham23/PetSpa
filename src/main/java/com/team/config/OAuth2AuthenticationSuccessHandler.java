//package com.team.config;
//
//
//
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.servlet.http.HttpSession;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
//import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//import java.io.IOException;
//
//import java.util.Map;
//
//@Component
//public class OAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
//
//
//    private final HttpSession httpSession;
//
//    public OAuth2AuthenticationSuccessHandler(HttpSession httpSession) {
//        this.httpSession = httpSession;
//    }
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                                        Authentication authentication) throws IOException, ServletException {
//        if (authentication instanceof OAuth2AuthenticationToken) {
//            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
//            Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();
//
//            // Retrieve email and name from OAuth2 user attributes
//            String email = (String) attributes.get("email");
//            // check email that exist or not
//            // if exist response back to sign-in and say already exist email.
//            System.out.println("email: " + email);
//            ResponseEntity<String> responseEntity = ResponseEntity.ok("{\"email\":\"" + email + "\"}");
//            response.setStatus(responseEntity.getStatusCodeValue());
//            response.setContentType("application/json");
//            response.getWriter().write(responseEntity.getBody());
//            httpSession.setAttribute("EMAIL", email);
//            // Redirect to sign-up page after successful OAuth2 authentication
//            response.sendRedirect("http://localhost:3000/sign-up");
//        } else {
//            // Handle other types of authentication
//            super.onAuthenticationSuccess(request, response, authentication);
//        }
//    }
//}