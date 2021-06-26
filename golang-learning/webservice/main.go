package main

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/palaniappa/dummy/webservice/controllers"
)

func main() {
	fmt.Println("Welcome to the web service")
	// u := models.User{
	// 	Id:        2,
	// 	FirstName: "Tricia",
	// 	LastName:  "McMillan",
	// }

	// fmt.Println(u)

	//learnLoop()
	//learnLoop1()
	//learnLoop2()
	//learnPanic()
	learnSwitch()

	controllers.RegisterControllers()
	http.ListenAndServe(":3000", nil)
	// port := 3000
	// started, err := startWebServer(port, 3)
	// fmt.Println(started, err)

	// var sum int = 0
	// sum = addNumbers(10, 20)
	// fmt.Println(sum)
}

func learnSwitch() {
	var method string = "GET1"
	switch method {
	case "GET":
		{
			println("GET")
		}
	case "POST":
		{
			println("POST")
		}
	case "HEAD":
		{
			println("HEAD")
		}
	default:
		{
			println("Default")
		}
	}
}

func learnPanic() {
	println("Weclome to the execution")
	panic("some unexpected exception happened")
	println("Done")
}

func learnLoop2() {
	slice := []int{1, 10, 100}
	for i := 0; i < len(slice); i++ {
		println(slice[i])
	}

	for j, v := range slice {
		println(j, v)
	}

	ranks := map[string]int{"Palani": 1, "Akila": 2, "Nallu": 3, "Ramu": 4}
	for k := range ranks {
		println("Key ", k)
	}

	for _, v := range ranks {
		println("Value ", v)
	}

	for k, v := range ranks {
		println(k, v)
	}
}

func learnLoop1() {

	for i := 0; i < 5; i++ {
		println(i)
	}

	var j int
	for {
		if j == 4 {
			break
		}
		println("Value of j", j)
		j++
	}
}

func learnLoop() {
	var i int = 0
	for i < 5 {
		fmt.Println("Value of i", i)
		i++
		if i == 4 {
			// println("Breaking!")
			// break
			continue
		}

		println("continuing...")

	}
}

func addNumbers(no1 int, no2 int) int {
	return no1 + no2
}

func startWebServer(port int, numberOfRetries int) (bool, error) {
	fmt.Println("Starting the web server on port", port, "...")

	fmt.Println("Server started")
	return false, errors.New("something went wrong")
}
