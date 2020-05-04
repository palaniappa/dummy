package com.movies.models;

import java.util.List;

public class UserRating {
	
	private String userId;
	private List<Rating> ratings;

	public UserRating() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserRating(String userId, List<Rating> ratings) {
		super();
		this.userId = userId;
		this.ratings = ratings;
	}

	public List<Rating> getRatings() {
		return ratings;
	}

	public void setRatings(List<Rating> ratings) {
		this.ratings = ratings;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	
}
