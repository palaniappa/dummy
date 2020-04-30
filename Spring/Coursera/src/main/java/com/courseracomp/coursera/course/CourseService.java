package com.courseracomp.coursera.course;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

	@Autowired
	private CourseRepository courseRepo;
	
	private List<Course> getAllCourses(){
		List<Course> courses = new ArrayList<>();
		courseRepo.findAll().forEach( c ->{
			courses.add(c);
		});
		return courses;
	}
	
	public Course saveCourse(Course c) {
		return courseRepo.save(c);
	}
	
	public Course getCourse(String id) {
		return courseRepo.findById(id).get();
	}
	
	public void deleteCourse(String id) {
		courseRepo.deleteById(id);
	}

	public List<Course> getAllCoursesForTopic(String topicId) {
		// TODO Auto-generated method stub
		List<Course> courses = new ArrayList<>();
		courseRepo.findByTopicId(topicId).forEach( c ->{
			courses.add(c);
		});
		return courses;
	}
}
