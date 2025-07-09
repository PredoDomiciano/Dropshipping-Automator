package com.DropBots.Dropshipping.Auto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Desabilita a proteção CSRF, que não é necessária para nossa API stateless
                .csrf(AbstractHttpConfigurer::disable)
                // Aplica a configuração de CORS definida no bean abaixo
                .cors(withDefaults())
                // Define as regras de autorização para os endpoints
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/orders/**").permitAll()
                        .requestMatchers("/api/products/**").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // A URL do seu frontend React, obtida da mensagem de erro
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));

        // Os métodos HTTP permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permite todos os cabeçalhos
        configuration.setAllowedHeaders(List.of("*"));

        // Permite o envio de credenciais (como cookies ou tokens de autenticação)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplica esta configuração a todos os endpoints que começam com /api/
        source.registerCorsConfiguration("/api/**", configuration);

        return source;
    }
}