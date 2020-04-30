package com.courseracomp.coursera.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.courseracomp.coursera.topic.Topic;

@RestController
@RequestMapping(path="/topics/{topicId}/courses")
public class CourseController {

	@Autowired
	private CourseService courseService;
	
	@RequestMapping(method=RequestMethod.GET)
	public List<Course> getAllCourses(@PathVariable String topicId){
		return courseService.getAllCoursesForTopic(topicId);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public Course addCourse(@PathVariable String topicId, @RequestBody Course course) {
		Topic t = new Topic(topicId,"","");
		course.setTopic(t);
		return courseService.saveCourse(course);
	}
	
	@RequestMapping(path="/{id}",method=RequestMethod.GET)
	public Course getCourse(@PathVariable String id) {
		return courseService.getCourse(id);
	}
	
	@RequestMapping(path="/{id}", method=RequestMethod.PUT)
	public Course updateCourse(@PathVariable String topicId, @PathVariable String id, @RequestBody Course c) {
		Topic t = new Topic(topicId,"","");
		c.setTopic(t);
		return courseService.saveCourse(c);
	}
	
	@RequestMapping(path="/{id}",method=RequestMethod.DELETE)
	public void delete(@PathVariable String id) {
		courseService.deleteCourse(id);
	}
}
