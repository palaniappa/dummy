package com.data.playground.repositories;

import com.data.playground.repositories.entity.DPChart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChartRepository extends JpaRepository<DPChart, String>  {
    List<DPChart> findAllByDashboardIdAndUserId(String dashboardId, String userId);

    Optional<DPChart> findByIdAndDashboardIdAndUserId(String id, String dashboardId, String userId);
}
