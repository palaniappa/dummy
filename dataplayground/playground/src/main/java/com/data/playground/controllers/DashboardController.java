package com.data.playground.controllers;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.repositories.entity.DPChart;
import com.data.playground.repositories.entity.DPDashboard;
import com.data.playground.services.ChartService;
import com.data.playground.services.DashboardService;
import com.data.playground.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "dashboard")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private ChartService chartService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<DPDashboard>> getAll() throws PlaygroundException {
        String userId = CommonUtil.getCurrentUserId();
        List<DPDashboard> dashboards = this.dashboardService.getAllDashboards(userId);
        return new ResponseEntity<>(dashboards, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<DPDashboard> createOrUpdate(@RequestBody DPDashboard dashboard) throws PlaygroundException {

        String userId = CommonUtil.getCurrentUserId();

        if(CommonUtil.isEmpty(dashboard.getId())
                || CommonUtil.isEmpty(dashboard.getTitle())
        ) {
            throw  new PlaygroundException(HttpStatus.BAD_REQUEST, "Invalid dashboard object. Please ensure all required fields are filled.");
        }
        dashboard.setUserId(userId);
        DPDashboard retrievedDashboard = this.dashboardService.save(dashboard);
        return new ResponseEntity<>(retrievedDashboard, HttpStatus.OK);

    }

    @RequestMapping(value = "/{dashboardId}", method = RequestMethod.DELETE)
    public ResponseEntity<String> delete(@PathVariable(value="dashboardId") String dashboardId) throws Exception {
        String userId = CommonUtil.getCurrentUserId();
        this.dashboardService.delete(dashboardId, userId);
        return new ResponseEntity<>(dashboardId, HttpStatus.OK);
    }

    @RequestMapping(value = "/{dashboardId}/chart",method = RequestMethod.GET)
    public ResponseEntity<List<DPChart>> getAllCharts(@PathVariable(value="dashboardId") String dashboardId) throws PlaygroundException {

        String userId = CommonUtil.getCurrentUserId();

        if(CommonUtil.isEmpty(dashboardId)
        ) {
            throw  new PlaygroundException(HttpStatus.BAD_REQUEST, "Invalid dashoard id.");
        }

        Optional<DPDashboard> dashboard = this.dashboardService.getDashboard(dashboardId, userId);
        if(dashboard.isPresent() == false)
        {
            throw  new PlaygroundException(HttpStatus.BAD_REQUEST, "Invalid dashoard id.");
        }
        List<DPChart> charts = this.chartService.getAllDashboardCharts(dashboardId, userId);
        return new ResponseEntity<>(charts, HttpStatus.OK);

    }

    @RequestMapping(value = "/{dashboardId}/chart",method = RequestMethod.POST)
    public ResponseEntity<DPChart> createOrUpdateChart(@PathVariable(value="dashboardId") String dashboardId,@RequestBody DPChart chart) throws PlaygroundException {

        String userId = CommonUtil.getCurrentUserId();

        if(CommonUtil.isEmpty(dashboardId)
                || CommonUtil.isEmpty(chart.getTitle())
                || CommonUtil.isEmpty(chart.getId())
        ) {
            throw  new PlaygroundException(HttpStatus.BAD_REQUEST, "Invalid chart object. Please ensure all required fields are filled.");
        }

        Optional<DPDashboard> dashboard = this.dashboardService.getDashboard(dashboardId, userId);
        if(dashboard.isPresent() == false)
        {
            throw  new PlaygroundException(HttpStatus.BAD_REQUEST, "Unable to find the dashboard with the given id");
        }
        chart.setUserId(userId);
        DPChart savedChart = this.chartService.save(chart);
        return new ResponseEntity<>(savedChart, HttpStatus.OK);

    }

    @RequestMapping(value = "/{dashboardId}/chart/{chartId}",method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteChart(@PathVariable(value="dashboardId") String dashboardId,@PathVariable(value="chartId") String chartId) throws PlaygroundException {
        String userId = CommonUtil.getCurrentUserId();

        if(CommonUtil.isEmpty(dashboardId)
                || CommonUtil.isEmpty(chartId)
        ) {
            throw  new PlaygroundException(HttpStatus.BAD_REQUEST, "Invalid chart object. Please ensure all required fields are filled.");
        }

        String deletedChartId = this.chartService.delete(chartId, dashboardId, userId);
        return new ResponseEntity<>(deletedChartId, HttpStatus.OK);
    }
}
