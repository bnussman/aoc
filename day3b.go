package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

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
					fmt.Println(lines[0], "-", lines[1], "-", lines[2], "-", string((rune(i + 65))))
					if i <= 25 {
						// capital letter
						score += i + 27
						fmt.Println(i+27, "points for", string((rune(i + 65))))
					} else {
						// lowercase letter
						score += (i - 32) + 1
						fmt.Println((i - 32 + 1), "points for", string((rune(i + 65))))
					}
				}
			}

			lines = []string{}
		}

	}

	fmt.Println("Answer", score)
}
