package com.bolt.insurance.group.com.bolt.insurance.group.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@EnableAutoConfiguration
@Configuration
@ComponentScan
public class App {
	
    public static void main( String[] args ){
    	
       SpringApplication.run(App.class, args);
    }
}
