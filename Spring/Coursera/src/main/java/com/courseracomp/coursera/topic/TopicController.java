package com.courseracomp.coursera.topic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/topics")
public class TopicController {

	@Autowired
	private TopicService topicService;
	
	@RequestMapping(method=RequestMethod.GET)
	public List<Topic> get() {
		List<Topic> topics = topicService.getAllTopics();
		return topics;
	}
	
	@RequestMapping(path="/{id}",method=RequestMethod.GET)
	public Topic getTopic(@PathVariable String id){
		Topic t = topicService.getTopic(id);
		return t;
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public Topic addTopic(@RequestBody Topic t) {
		Topic result = null;
		result = topicService.addTopic(t);
		return result;
	}
	
	@RequestMapping(path="/{id}",method=RequestMethod.PUT)
	public Topic updateTopic(@PathVariable String id, @RequestBody Topic t) throws Exception {
		Topic result = null;
		topicService.updateTopic(id,t);
		result = topicService.getTopic(id);
		return result;
	}
	
	@RequestMapping(path="/{id}", method=RequestMethod.DELETE)
	public boolean deleteTopic(@PathVariable String id) {
		return topicService.deleteTopic(id);
	}
}
