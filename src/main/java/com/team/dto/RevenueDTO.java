package com.team.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueDTO {
    private LocalDate date;
    private Double totalRevenue;
    private Long orderCount;
    private Map<String, Long> serviceCount;
    private Map<String, Long> customerPaymentCounts;
}
