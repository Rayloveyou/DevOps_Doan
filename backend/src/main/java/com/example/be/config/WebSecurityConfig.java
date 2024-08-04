package com.example.be.config;

import com.example.be.security.CustomUserDetailsService;
import com.example.be.security.JwtAuthenticationEntryPoint;
import com.example.be.security.JwtAuthenticationFilter;
import com.example.be.service.OAuth2.impl.CustomOAuth2UserService;
import com.example.be.service.OAuth2.impl.OAuth2LoginSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Autowired
    private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    @Autowired
    private CustomOAuth2UserService oauth2UserService;
    @Bean
    public JwtAuthenticationFilter jwtTokenFilter(){
        return new JwtAuthenticationFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors().and().csrf().disable()
                .authorizeRequests() 
                .antMatchers("/api/register","/api/login","/api/reset-password"
                        ,"/api/forgot-password","/api/check-otp","/api/product","/api/product/detail","/api/product/sale-list"
                        ,"/api/producer/**","/api/product-type/**","/api/capacity/**","/api/oauth2/**","/api/login/**")
                .permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/api/cart/**","/api/payment","/api/change-password","/api/customer/**")
                .hasAnyRole("USER","ADMIN")
                .antMatchers("/api/product/create","/api/product/delete","/api/product/not-data"
                        ,"/api/product/data-entry","/api/product/update","/api/product/data-entry-update","/api/order/**")
                .hasRole("ADMIN")
                .anyRequest().authenticated()
                .and().exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .oauth2Login()
                .loginPage("/api/login")
                .userInfoEndpoint()
                .userService(oauth2UserService)
                .and()
                .successHandler(oAuth2LoginSuccessHandler)
                .and()
                .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        httpSecurity.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}