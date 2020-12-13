package com.data.playground.repositories;

import com.data.playground.repositories.entity.DPDashboard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DashboardRepository extends JpaRepository<DPDashboard, String>  {

    List<DPDashboard> findAllByUserId(String userId);
    Optional<DPDashboard> findDPDashboardByIdAndUserId(String dashboardId, String userId);
}
