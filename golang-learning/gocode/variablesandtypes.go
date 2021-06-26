package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello from module")

	//basicValueTypes()

	// pointer data type.
	//pointerTypes()

	//constants()

	//learnArrays()

	//learnMap()

	learnStruct()

}

func learnStruct() {
	type user struct {
		id        int
		firstName string
		lastName  string
	}
	var u user
	u.id = 1
	u.firstName = "Palaniappa"
	u.lastName = "Ramanathan"
	fmt.Println(u)

	u.firstName = "Palaniappan"
	fmt.Println(u)

	u2 := user{
		id:        123,
		firstName: "Ramanathan",
		lastName:  "Palaniappa"}
	fmt.Println(u2)
}

func learnMap() {
	m := map[string]int{"a": 1, "b": 2, "c": 4}
	fmt.Println(m)

	fmt.Println(m["a"])

	m["b"] = 90

	fmt.Println(m)

	delete(m, "b")
	fmt.Println(m)

}

func learnArrays() {
	fmt.Println("Let us learn array")
	var arr [3]int
	arr[0] = 10
	arr[1] = 21
	arr[2] = 3

	fmt.Println(arr[0], arr[1], arr[2])
	fmt.Println(arr)

	arr1 := [5]int{1, 2, 4, 5}

	fmt.Println(arr1)

	//auto initializes with value 0
	var arr2 [3]int
	fmt.Println(arr2)

	slice := []int{1, 2, 3}
	fmt.Println(slice)

	slice = append(slice, 4, 42, 27) //new array and copies the data
	fmt.Println("Slice :", slice)

	s2 := slice[1:]
	fmt.Println("Slice [1:]", s2)

	s3 := slice[:2]
	fmt.Println("slice[:2]", s3)

	s4 := slice[1:2]
	fmt.Println("slice[1:2]", s4)

}

func basicValueTypes() {
	// All value types

	//declaration and initialization
	var i int = 10
	fmt.Println(i)

	// declartion and separate initialization
	var f float32
	f = 3.14
	fmt.Println(f)

	//implicit delcaration and initialization
	name := "Palani"
	fmt.Println(name)

	b := true
	fmt.Println(b)

	c := complex(3, 4)
	fmt.Println(c)

	r, im := real(c), imag(c)
	fmt.Println(r, im)
}

func pointerTypes() {
	var firstName *string = new(string)
	*firstName = "Palani"
	fmt.Println(*firstName)
	fmt.Println(firstName)
	// Note pointer arithmetic are not allowed in Go

	//Address of operator
	lastName := "Ramanathan"
	fmt.Println(lastName)

	ptr := &lastName
	fmt.Println(*ptr)
	fmt.Println(ptr)
}

func constants() {
	fmt.Println("Welcome to constants")
	const pi = 3.1415
	fmt.Println(pi)

	//dynamic type
	const x = 3
	fmt.Println(x + 4)

	fmt.Println(x + 1.4)

	const y int = 3
	fmt.Println(y + 4)

	//fmt.Println(y + 1.4) // error
	fmt.Println(float32(y) + 1.4)

	// Extension to constants
	// to learn about iota
	const (
		first = iota + 6
		second
		third
	)

	const (
		fourth = iota
	)

	fmt.Println(first, second, third, fourth)
}
