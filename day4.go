package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func day4() {
	day4a()
	day4b()
}

func day4a() {
	path, _ := filepath.Abs("./inputs/day4")

	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(file)

	total := 0

	for scanner.Scan() {
		pairs := strings.Split(scanner.Text(), ",")

		firstRange := strings.Split(pairs[0], "-")
		secondRange := strings.Split(pairs[1], "-")

		firstPairMin, _ := strconv.Atoi(firstRange[0])
		secondPairMin, _ := strconv.Atoi(secondRange[0])
		firstPairMax, _ := strconv.Atoi(firstRange[1])
		secondPairMax, _ := strconv.Atoi(secondRange[1])

		if isInRange(firstPairMin, secondPairMin, secondPairMax) && isInRange(firstPairMax, secondPairMin, secondPairMax) || isInRange(secondPairMin, firstPairMin, firstPairMax) && isInRange(secondPairMax, firstPairMin, firstPairMax) {
			total++
		}

		// fmt.Println("Pairs", firstRange, secondRange)
	}

	fmt.Println("[Part 1]", total)
}

func day4b() {
	path, _ := filepath.Abs("./inputs/day4")

	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(file)

	total := 0

	for scanner.Scan() {
		pairs := strings.Split(scanner.Text(), ",")

		firstRange := strings.Split(pairs[0], "-")
		secondRange := strings.Split(pairs[1], "-")

		firstPairMin, _ := strconv.Atoi(firstRange[0])
		secondPairMin, _ := strconv.Atoi(secondRange[0])
		firstPairMax, _ := strconv.Atoi(firstRange[1])
		secondPairMax, _ := strconv.Atoi(secondRange[1])

		if isInRange(firstPairMin, secondPairMin, secondPairMax) || isInRange(firstPairMax, secondPairMin, secondPairMax) || isInRange(secondPairMin, firstPairMin, firstPairMax) || isInRange(secondPairMax, firstPairMin, firstPairMax) {
			total++
		}

		// fmt.Println("Pairs", firstRange, secondRange)
	}

	fmt.Println("[Part 2]", total)
}

func isInRange(value int, min int, max int) bool {
	return value >= min && value <= max
}