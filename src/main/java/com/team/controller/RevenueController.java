//package com.team.controller;
//
//import com.team.dto.RevenueDTO;
//import com.team.service.RevenueService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//public class RevenueController {
//    @Autowired
//    private RevenueService revenueService;
//
//    @GetMapping("/weekly-revenue")
//    public List<RevenueDTO> getWeeklyRevenue() {
//        return revenueService.getWeeklyRevenue();
//    }
//}
