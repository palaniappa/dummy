package models

import (
	"errors"
	"fmt"
)

type User struct {
	Id        int
	FirstName string
	LastName  string
}

var (
	users  []*User
	nextId = 1
)

func GetUsers() []*User {
	return users
}

func AddUser(user User) (User, error) {
	if user.Id != 0 {
		return User{}, errors.New("new user must not include id or it must be set to 0")
	}
	user.Id = nextId
	nextId++
	users = append(users, &user)
	return user, nil
}

func GetUserById(id int) (User, error) {
	for _, u := range users {
		if u.Id == id {
			return *u, nil
		}
	}
	return User{}, fmt.Errorf("User with id %v not found", id)
}

func UpdateUser(u User) (User, error) {
	for i, c := range users {
		if u.Id == c.Id {
			users[i] = &u
			return u, nil
		}
	}
	return User{}, fmt.Errorf("User with id %v not found", u.Id)
}

func RemoveUser(id int) (User, error) {
	for i, u := range users {
		if u.Id == id {
			users = append(users[:i], users[i+1:]...)
			return *u, nil
		}
	}
	return User{}, fmt.Errorf("Failed to find the user with id %v", id)
}
