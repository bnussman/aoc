package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

func day3() {
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
				fmt.Println(first, "-", second, "-", string((rune(i + 65))))
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

	}

	fmt.Println("Answer", score)
}
