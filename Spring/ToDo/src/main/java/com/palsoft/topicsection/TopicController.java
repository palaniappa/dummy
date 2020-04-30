package com.palsoft.topicsection;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.palsoft.models.Topic;

@RestController
public class TopicController {

	@RequestMapping("/newtopics")
	public String getNewTopics() {
		return "new topic";
	}
	
	@RequestMapping("topics")
	public List<Topic> getAllTopics() {
		ArrayList<Topic> topics = new ArrayList<Topic>();
		topics.add(new Topic("1","A", "a desc"));
		topics.add(new Topic("2","B", "b desc"));
		topics.add(new Topic("3","C", "c desc"));
		return topics;
		
	}
}
