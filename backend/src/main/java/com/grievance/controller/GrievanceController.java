package com.grievance.controller;

import com.grievance.entity.Grievance;
import com.grievance.entity.User;
import com.grievance.repository.GrievanceRepository;
import com.grievance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Grievance> getUserGrievances(@PathVariable Long userId) {
        return grievanceRepository.findByUserId(userId);
    }

    @PostMapping("/add")
    public Grievance addGrievance(@RequestBody Grievance grievance) {
        // In a real app, we fetch the user from the SecurityContext
        // For now, we assume the frontend sends the user object or ID
        if (grievance.getUser() != null && grievance.getUser().getId() != null) {
            User u = userRepository.findById(grievance.getUser().getId()).orElse(null);
            grievance.setUser(u);
        }
        return grievanceRepository.save(grievance);
    }
}
