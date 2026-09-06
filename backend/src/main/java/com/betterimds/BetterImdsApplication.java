package com.betterimds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.awt.Desktop;
import java.awt.GraphicsEnvironment;
import java.net.URI;

@SpringBootApplication
public class BetterImdsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BetterImdsApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void openSwaggerUI() {
        // Skip browser launch in headless / cloud / Docker container environments
        if (!GraphicsEnvironment.isHeadless() && Desktop.isDesktopSupported()) {
            try {
                if (Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                    Desktop.getDesktop().browse(new URI("http://localhost:8080/swagger-ui.html"));
                }
            } catch (Exception ignored) {
            }
        }
    }
}
