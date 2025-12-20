package com.grievance;

import com.grievance.entity.User;
import com.grievance.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class GrievanceSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrievanceSystemApplication.class, args);
    }

    @Bean
    public CommandLineRunner createAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByEmail("sachinadmin@civil.gov")) {
                User admin = new User();
                admin.setEmail("sachinadmin@civil.gov");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                admin.setFullName("System Administrator");
                admin.setMobileNumber("0000000000");
                userRepository.save(admin);
                System.out.println("Admin user created: admin@civil.gov / admin123");
            }
        };
    }
}
