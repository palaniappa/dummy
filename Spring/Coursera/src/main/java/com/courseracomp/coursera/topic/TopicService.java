package com.courseracomp.coursera.topic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

	@Autowired
	private TopicRepository topicRepository;
	
	public TopicService() {

	}
	
	public List<Topic> getAllTopics(){
		List<Topic> topics = new ArrayList<>();
		topicRepository.findAll().forEach( t -> {
			topics.add(t);
		});
		return topics;
	}
	
	public Topic getTopic(String id) {
		return topicRepository.findById(id).get();
	}
	
	public Topic addTopic(Topic t) {
		Topic result = topicRepository.save(t);
		return result;
	}
	
	public Topic updateTopic(String id, Topic t) throws Exception {
		Topic result = topicRepository.save(t);
		return result;
	}
	
	public boolean deleteTopic(String id) {
		boolean topicFound = true;
		try {
			topicRepository.deleteById(id);
		}
		catch(Exception e) {
			topicFound = false;
		}
		return topicFound;
	}
}
