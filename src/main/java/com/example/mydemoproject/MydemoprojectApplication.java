package com.example.mydemoproject;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.mydemoproject.dao")
public class MydemoprojectApplication {

    public static void main(String[] args) {
        SpringApplication.run(MydemoprojectApplication.class, args);
    }
}
