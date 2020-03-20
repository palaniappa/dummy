package main

import "fmt"

func main() {
	var countOfElements int
	var elementToFind int
	fmt.Scan(&countOfElements)
	fmt.Scan(&elementToFind)

	var elements []int = make([]int, countOfElements)
	for i := 0; i < countOfElements; i++ {
		fmt.Scan(&elements[i])
	}

	var elemetLastIndex int = countOfElements - 1
	for ; elemetLastIndex > -1; elemetLastIndex-- {
		if elements[elemetLastIndex] == elementToFind {
			break
		}
	}

	if elemetLastIndex != -1 {
		elemetLastIndex++
	}
	fmt.Println(elemetLastIndex)

}
