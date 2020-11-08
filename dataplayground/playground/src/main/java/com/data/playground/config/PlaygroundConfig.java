package com.data.playground.config;

import com.data.playground.security.GoogleIdAuthenticationProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PlaygroundConfig {

    public static GoogleIdAuthenticationProvider googleIdAuthenticationProvider = new GoogleIdAuthenticationProvider();
    @Bean
    public GoogleIdAuthenticationProvider getGoogleIdAuthenticationProvider() {
        return googleIdAuthenticationProvider;
    }
}
