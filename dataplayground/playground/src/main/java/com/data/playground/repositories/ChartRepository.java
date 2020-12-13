package com.data.playground.repositories;

import com.data.playground.repositories.entity.DPChart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChartRepository extends JpaRepository<DPChart, String>  {
}
