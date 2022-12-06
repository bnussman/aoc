package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func day5() {
	day5a()
	day5b()
}

func day5a() {
	path, _ := filepath.Abs("./inputs/day5")

	file, _ := os.Open(path)

	scanner := bufio.NewScanner(file)

	var crates []Stack

	// Populate crates array of stacks
	for scanner.Scan() {
		line := scanner.Text()

		if line[0:2] == " 1" {
			// Swallow the empty line
			scanner.Scan()
			break
		}

		if len(crates) == 0 {
			crates = make([]Stack, (len(line)+1)/4)
		}

		crate := 0
		for i := 1; i < len(line); i += 4 {
			crateLetter := string(line[i])
			if crateLetter != " " {
				// fmt.Println("Pushing", crateLetter, "to", crate+1)
				crates[crate].Push(crateLetter)
			}
			crate++
		}
	}

	for i, crate := range crates {
		crates[i] = *crate.Reverse()
	}

	// Process the given instructions
	for scanner.Scan() {
		line := scanner.Text()

		instruction := strings.Split(line, " ")

		amount, _ := strconv.Atoi(instruction[1])
		from, _ := strconv.Atoi(instruction[3])
		to, _ := strconv.Atoi(instruction[5])

		for i := 0; i < amount; i++ {
			crates[to-1].Push(crates[from-1].Pop())
		}
	}

	// for i, val := range crates {
	// 	fmt.Printf("Crate %d - ", i+1)
	// 	val.Print()
	// }

	fmt.Print("[Part 1] ")
	for _, val := range crates {
		fmt.Print(val.Peek())
	}
	fmt.Print("\n")
}

func day5b() {
	path, _ := filepath.Abs("./inputs/day5")

	file, _ := os.Open(path)

	scanner := bufio.NewScanner(file)

	var crates []Stack

	// Populate crates array of stacks
	for scanner.Scan() {
		line := scanner.Text()

		if line[0:2] == " 1" {
			// Swallow the empty line
			scanner.Scan()
			break
		}

		if len(crates) == 0 {
			crates = make([]Stack, (len(line)+1)/4)
		}

		crate := 0
		for i := 1; i < len(line); i += 4 {
			crateLetter := string(line[i])
			if crateLetter != " " {
				// fmt.Println("Pushing", crateLetter, "to", crate+1)
				crates[crate].Push(crateLetter)
			}
			crate++
		}
	}

	for i, crate := range crates {
		crates[i] = *crate.Reverse()
	}

	// Process the given instructions
	for scanner.Scan() {
		line := scanner.Text()

		instruction := strings.Split(line, " ")
		amount, _ := strconv.Atoi(instruction[1])
		from, _ := strconv.Atoi(instruction[3])
		to, _ := strconv.Atoi(instruction[5])

		cratesToMove := new(Stack)

		for i := 0; i < amount; i++ {
			cratesToMove.Push(crates[from-1].Pop())
		}

		crateLetter := cratesToMove.Pop()
		for crateLetter != nil {
			fmt.Println("moving", crateLetter)
			crates[to-1].Push(crateLetter)
			crateLetter = cratesToMove.Pop()
		}
	}

	for i, val := range crates {
		fmt.Printf("Crate %d - ", i+1)
		val.Print()
	}

	fmt.Print("[Part 2] ")
	for _, val := range crates {
		fmt.Print(val.Peek())
	}
	fmt.Print("\n")
}
