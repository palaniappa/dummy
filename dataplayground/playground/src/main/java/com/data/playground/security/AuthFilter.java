package com.data.playground.security;

import com.data.playground.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthFilter extends GenericFilterBean {


    AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource = new WebAuthenticationDetailsSource();
    AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    public AuthFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws AuthenticationException, ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse)res;

        if(request.getMethod().equals("OPTIONS")) {
            chain.doFilter(request, response);
            return;
        }
        
        Authentication authResult;
        try {
            authResult = this.attemptAuthentication(request, response);
            if (authResult == null) {
                return;
            }
            SecurityContextHolder.getContext().setAuthentication(authResult);
        } catch (InternalAuthenticationServiceException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            this.logger.error("An internal error occurred while trying to authenticate the user.", e);
            throw e;
        } catch (AuthenticationException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            throw e;
        }
        chain.doFilter(request, response);
    }

    private Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String token = request.getHeader("Authorization");

        if (token == null) {
           throw new BadCredentialsException("Token not provided.");
        }

        token = token.replace("Bearer ","");
        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Google ID Token Authorization parameter found with value '" + token + "'");
        }

        Object details = this.authenticationDetailsSource.buildDetails(request);

        GoogleIdAuthenticationToken authRequest = new GoogleIdAuthenticationToken(token, details);

        Authentication authResult = this.authenticationManager.authenticate(authRequest);

        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Authentication success: " + authResult);
        }

        return authResult;
    }
}
