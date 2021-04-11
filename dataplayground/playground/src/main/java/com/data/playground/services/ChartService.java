package com.data.playground.services;

import com.data.playground.repositories.ChartRepository;
import com.data.playground.repositories.entity.DPChart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChartService {
    @Autowired
    private ChartRepository chartRepository;

    public List<DPChart> getAllDashboardCharts(String dashboardId, String userId) {
        return  this.chartRepository.findAllByDashboardIdAndUserId(dashboardId, userId);
    }
    public DPChart save(DPChart chart) {
        return this.chartRepository.save(chart);
    }

    public String delete(String chartId, String dashboardId, String userId) {
        Optional<DPChart> chart = this.chartRepository.findByIdAndDashboardIdAndUserId(chartId, dashboardId, userId);
        if(chart.isPresent()){
            this.chartRepository.delete(chart.get());
            return chart.get().getId();
        }
        return null;
    }
}
