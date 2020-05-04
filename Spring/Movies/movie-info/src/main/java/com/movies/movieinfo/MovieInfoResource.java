package com.movies.movieinfo;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.movies.models.Movie;

@RestController
@RequestMapping(path="/movies")
public class MovieInfoResource {
	
	@RequestMapping(path="/{id}", method=RequestMethod.GET)
	public Movie getMovieInfo(@PathVariable String id) {
		return new Movie(id,"Test Movie Name", "Test Movie Description.");
	}
}
