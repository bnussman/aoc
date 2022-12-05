package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

func day5() {
	path, _ := filepath.Abs("./inputs/day5")

	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		// line := scanner.Text()
	}

	fmt.Println("[Part 1]")
}