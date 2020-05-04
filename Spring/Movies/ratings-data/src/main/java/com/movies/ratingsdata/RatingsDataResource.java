package com.movies.ratingsdata;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.movies.models.Rating;
import com.movies.models.UserRating;

@RestController
@RequestMapping("/ratingsdata")
public class RatingsDataResource {

	@RequestMapping(path="/{movieId}", method=RequestMethod.GET)
	public Rating getRating(@PathVariable("movieId") String movieId)
	{
		return new Rating(movieId,4.5);
	}
	
	@RequestMapping(path="users/{userId}", method=RequestMethod.GET)
	public UserRating getUserRatingsForMovies(@PathVariable String userId){
		List<Rating> ratings = new ArrayList<>();
		ratings.add(new Rating("BIGSHORT",4.5));
		ratings.add(new Rating("HANGOVER",3.5));
		
		return new UserRating(userId,ratings);
	}
}
