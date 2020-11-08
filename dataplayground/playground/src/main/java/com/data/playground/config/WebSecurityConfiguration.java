package com.data.playground.config;

import com.data.playground.security.AuthFilter;
import com.data.playground.security.GoogleIdAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.session.ConcurrentSessionFilter;

@EnableWebSecurity
@Order(1000)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private GoogleIdAuthenticationProvider authProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(this.authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.addFilterAfter(new AuthFilter(authenticationManager()), ConcurrentSessionFilter.class);

    }

}

