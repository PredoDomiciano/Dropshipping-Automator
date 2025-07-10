package com.DropBots.Dropshipping.Auto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DropshippingAutoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DropshippingAutoApplication.class, args);
	}

}