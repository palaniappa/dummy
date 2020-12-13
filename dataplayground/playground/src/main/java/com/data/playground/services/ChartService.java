package com.data.playground.services;

import com.data.playground.repositories.ChartRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ChartService {
    @Autowired
    private ChartRepository chartRepository;
}
