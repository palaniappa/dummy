package controllers

import (
	"encoding/json"
	"net/http"
	"regexp"

	"github.com/palaniappa/dummy/webservice/models"
)

type userController struct {
	//routing
	userIdPattern *regexp.Regexp
}

func (uc userController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello from the user controller"))
}

func newUserController() *userController {
	return &userController{
		userIdPattern: regexp.MustCompile(`^/users/(\d+)/?`),
	}

	// var uc userController
	// uc.userIdPattern = regexp.MustCompile(`^/users/(\d+)/?`)
	// return &uc

}

func (uc userController) getAll(w http.ResponseWriter, r *http.Request) {
	users := models.GetUsers()
	encodeResponseAsJSON(users, w)
}

func (uc userController) get(id int, w http.ResponseWriter) {
	u, err := models.GetUserById(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("User not found with given id"))
		return
	}
	encodeResponseAsJSON(u, w)
}

func (uc userController) post(w http.ResponseWriter, r *http.Request) {
	u, err := uc.parseRequest(r)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	u, err = models.AddUser(u)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	encodeResponseAsJSON(u, w)
}

func (uc userController) put(id int, w http.ResponseWriter, r *http.Request) {
	u, err := uc.parseRequest(r)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	if id != u.Id {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Id of the submitted user must match the id in the url"))
		return
	}
	u, err = models.UpdateUser(u)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	encodeResponseAsJSON(u, w)

}

func (uc userController) delete(id int, w http.ResponseWriter, r *http.Request) {
	u, err := models.RemoveUser(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	encodeResponseAsJSON(u, w)
}

func (uc userController) parseRequest(r *http.Request) (models.User, error) {
	dec := json.NewDecoder(r.Body)
	var u models.User
	err := dec.Decode(&u)
	if err != nil {
		return models.User{}, err
	}
	return u, nil
}
