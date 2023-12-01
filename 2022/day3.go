package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

func day3() {
	day3a()
	day3b()
}

func day3a() {
	path, _ := filepath.Abs("./inputs/day3")

	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(file)

	score := 0

	for scanner.Scan() {
		rucksack := scanner.Text()

		middle := len(rucksack) / 2

		first := rucksack[:middle]
		second := rucksack[middle:]

		firstLetters := make([]int, 58)
		secondLetters := make([]int, 58)

		for _, char := range first {
			firstLetters[int(char)-65]++
		}

		for _, char := range second {
			secondLetters[int(char)-65]++
		}

		for i := range firstLetters {
			if firstLetters[i] > 0 && secondLetters[i] > 0 {
				if i <= 25 {
					// capital letter
					score += i + 27
				} else {
					// lowercase letter
					score += (i - 32) + 1
				}
			}
		}

	}

	fmt.Println("[Part 1]", score)
}

func day3b() {
	path, _ := filepath.Abs("./inputs/day3")

	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(file)

	lines := []string{}
	score := 0

	for scanner.Scan() {
		lines = append(lines, scanner.Text())

		if len(lines) == 3 {
			firstLetters := make([]int, 58)
			secondLetters := make([]int, 58)
			thirdLetters := make([]int, 58)

			for _, char := range lines[0] {
				firstLetters[int(char)-65]++
			}

			for _, char := range lines[1] {
				secondLetters[int(char)-65]++
			}

			for _, char := range lines[2] {
				thirdLetters[int(char)-65]++
			}

			for i := range firstLetters {
				if firstLetters[i] > 0 && secondLetters[i] > 0 && thirdLetters[i] > 0 {
					if i <= 25 {
						// capital letter
						score += i + 27
					} else {
						// lowercase letter
						score += (i - 32) + 1
					}
				}
			}

			lines = []string{}
		}

	}

	fmt.Println("[Part 2]", score)
}