package com.palsoft.todostarter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.palsoft.models.Topic;

@RestController
public class TodoController {

	@RequestMapping("/hello")
	public String Welcome() {
		return "cool";
	}
	
	
}
