package com.team.controller;


import com.team.model.Services;
import com.team.service.FunctionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final FunctionService functionService;

   public SearchController(FunctionService functionService) {
       this.functionService = functionService;
   }

    @PostMapping("")
    public ResponseEntity<?> getAllServices(@RequestBody Map<String, String> searchData) {
        String serviceName = searchData.get("search");
        List<Services> listServices = functionService.findServicesByName(serviceName);
        if (!listServices.isEmpty()) {
            return ResponseEntity.ok().body(listServices);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doesn't have that service");
    }



}
