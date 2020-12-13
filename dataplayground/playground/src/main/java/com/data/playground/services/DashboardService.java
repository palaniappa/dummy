package com.data.playground.services;

import com.data.playground.repositories.DashboardRepository;
import com.data.playground.repositories.entity.DPDashboard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DashboardService {
    @Autowired
    private DashboardRepository dashboardRepository;


    public List<DPDashboard> getAllDashboards(String userId) {
        return this.dashboardRepository.findAllByUserId(userId);
    }

    public DPDashboard save(DPDashboard dashboard) {
        return this.dashboardRepository.save(dashboard);
    }

    public Optional<DPDashboard> getDashboard(String dashboardId, String userId) {
        return this.dashboardRepository.findDPDashboardByIdAndUserId(dashboardId, userId);
    }
    public void delete(String dashboardId, String userId) {
        Optional<DPDashboard> dashboard = this.dashboardRepository.findDPDashboardByIdAndUserId(dashboardId, userId);
        if(dashboard.isPresent()) {
            this.dashboardRepository.delete(dashboard.get());
        }
    }
}
