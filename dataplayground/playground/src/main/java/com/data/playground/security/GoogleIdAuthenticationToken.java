package com.data.playground.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class GoogleIdAuthenticationToken extends AbstractAuthenticationToken {
    private String credentials;
    private Object principal;

    public GoogleIdAuthenticationToken(String token, Object details) {
        super(new ArrayList<>());
        this.credentials = token;
        setDetails(details);
        setAuthenticated(false);
    }

    GoogleIdAuthenticationToken(String token, Object principal, Collection<? extends GrantedAuthority> authorities, Object details) {
        super(authorities);
        this.credentials = token;
        this.principal = principal;
        setDetails(details);
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return credentials;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}
