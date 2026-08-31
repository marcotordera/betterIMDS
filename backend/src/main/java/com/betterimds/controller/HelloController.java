package com.betterimds.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HelloController {

    private static final Logger log = LoggerFactory.getLogger(HelloController.class);

    @GetMapping("/hello")
    public Map<String, Object> getHelloMessage() {
        log.info("--> Received HTTP GET request on /api/hello [STATUS 200 OK]");
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "Hello from BetterIMDS Spring Boot REST API!!!!");
        response.put("system", "BetterIMDS Unit Training & Readiness Service");
        response.put("timestamp", LocalDateTime.now().toString());
        return response;
    }
}
