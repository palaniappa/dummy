package com.data.playground.security;

import com.data.playground.repositories.entity.UserModel;
import com.data.playground.services.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.SpringSecurityMessageSource;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

public class GoogleIdAuthenticationProvider implements AuthenticationProvider {

    private HttpTransport httpTransport = new NetHttpTransport();
    private JsonFactory jsonFactory = new JacksonFactory();

    @Autowired
    private UserService userService;

    protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (!supports(authentication.getClass())) {
            return null;
        }

        GoogleIdAuthenticationToken googleIdAuthenticationToken = (GoogleIdAuthenticationToken) authentication;

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(httpTransport, jsonFactory)
                .setAudience(Collections.singletonList(getClientId()))
                .build();

        GoogleIdToken googleIdToken = null;
        try {
            googleIdToken = verifier.verify((String) googleIdAuthenticationToken.getCredentials());

            if (googleIdToken == null) {
                throw new BadCredentialsException("Unable to verify token");
            }
        } catch (IOException | GeneralSecurityException e) {
            throw new BadCredentialsException("Unable to verify token", e);
        }

        GoogleIdToken.Payload payload = googleIdToken.getPayload();

        String email = payload.getEmail();
        String name = (String) payload.get("name");

        UserModel registeredUser = this.userService.getOrRegisterUser(email, name);
        return new GoogleIdAuthenticationToken((String) googleIdAuthenticationToken.getCredentials(), registeredUser, null, authentication.getDetails());
    }

    @Override
    public boolean supports(Class<? extends Object> authentication) {
        return (GoogleIdAuthenticationToken.class.isAssignableFrom(authentication));
    }

    public String getClientId() {
        return "422746712712-v1s1j6b3s66gda1np0a2179vn0fu5fjf.apps.googleusercontent.com";
    }

}
