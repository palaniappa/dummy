package com.movies.moviecatalog;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.movies.models.CatalogItem;
import com.movies.models.Movie;
import com.movies.models.Rating;
import com.movies.models.UserRating;

@RestController
@RequestMapping("/catalog")
public class MovieCatalogResource {

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private WebClient.Builder webClientBuilder;
	
	@RequestMapping(path="/{userId}", method=RequestMethod.GET)
	public List<CatalogItem> getCatalogForUser(@PathVariable String userId){
		
		UserRating userRating = restTemplate.getForObject("http://ratings-data-service/ratingsdata/users/"+userId, UserRating.class);
		
		
		
		List<CatalogItem> result = new ArrayList<>();
		for(int i=0;i<userRating.getRatings().size();++i) {
			Rating r = userRating.getRatings().get(i);
			Movie m = restTemplate.getForObject("http://movie-info-service/movies/" + r.getMovieId(), Movie.class);
			/*Movie m = webClientBuilder.build().get()
				.uri("http://localhost:8082/movies/" + r.getMovieId())
				.retrieve()
				.bodyToMono(Movie.class)
				.block();*/
			
			result.add(new CatalogItem(m.getName(), m.getDescription(),r.getRating()));
		}
		return result;
	}
}
