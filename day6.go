package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func day6() {
	day6a()
	day6b()
}

func day6a() {
	path, _ := filepath.Abs("./inputs/day6")

	file, _ := os.Open(path)

	scanner := bufio.NewScanner(file)

	scanner.Scan()

	distinctCharacters := 4

	line := strings.Split(scanner.Text(), "")

	current := make([]string, distinctCharacters)

	for i := 0; i < len(line)-distinctCharacters-1; i++ {
		current = line[i : i+distinctCharacters]
		hasDuplicates := false

		for _, val := range current {
			if !isUnique(current, val) {
				hasDuplicates = true
				break
			}
		}

		if !hasDuplicates {
			fmt.Println("[Part 1]", i+distinctCharacters)
			break
		}
	}
}

func day6b() {
	path, _ := filepath.Abs("./inputs/day6")

	file, _ := os.Open(path)

	scanner := bufio.NewScanner(file)

	scanner.Scan()

	line := strings.Split(scanner.Text(), "")

	distinctCharacters := 14

	current := make([]string, distinctCharacters)

	for i := 0; i < len(line)-distinctCharacters-1; i++ {
		current = line[i : i+distinctCharacters]
		hasDuplicates := false

		for _, val := range current {
			if !isUnique(current, val) {
				hasDuplicates = true
				break
			}
		}

		if !hasDuplicates {
			fmt.Println("[Part 2]", i+distinctCharacters)
			break
		}
	}
}

func isUnique(s []string, e string) bool {
	count := 0
	for _, a := range s {
		if a == e {
			count++
			if count > 1 {
				return false
			}
		}
	}
	return true
}
