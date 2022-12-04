package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func day2() {
	part1()
	part2()
}

func part1() {
	path, _ := filepath.Abs("./inputs/day2")

	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(file)

	score := 0

	for scanner.Scan() {
		line := scanner.Text()

		lineValues := strings.Split(line, " ")

		// A for Rock
		// B for Paper
		// C for Scissors
		elfLetter := lineValues[0]

		letterMap := map[string]string{"X": "A", "Y": "B", "Z": "C"}

		pointsMap := map[string]int{"A": 1, "B": 2, "C": 3}

		// X for Rock
		// Y for Paper
		// Z for Scissors
		myLetter := letterMap[lineValues[1]]

		if elfLetter == myLetter {
			// tie
			score += 3 + pointsMap[myLetter]

		} else if myLetter == "A" && elfLetter == "B" {
			// i picked rock, elf picked paper, elf wins
			score += pointsMap[myLetter]

		} else if myLetter == "A" && elfLetter == "C" {
			// i picked rock, elf picked scissors, I win
			score += pointsMap[myLetter] + 6

		} else if myLetter == "B" && elfLetter == "A" {
			// i picked paper, elf picked rock, I win
			score += pointsMap[myLetter] + 6

		} else if myLetter == "B" && elfLetter == "C" {
			// i picked paper, elf picked Scissors, elf wins
			score += pointsMap[myLetter]

		} else if myLetter == "C" && elfLetter == "A" {
			// i picked scissors, elf picked rock, elf wins
			score += pointsMap[myLetter]

		} else if myLetter == "C" && elfLetter == "B" {
			// i scissors paper, elf picked paper, I win
			score += pointsMap[myLetter] + 6

		} else {
			log.Fatal("No winner found")
		}
	}

	fmt.Println(score)
}

func part2() {
	path, _ := filepath.Abs("./inputs/day2")

	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(file)

	score := 0

	for scanner.Scan() {
		line := scanner.Text()

		lineValues := strings.Split(line, " ")

		letterToPlay := map[string]string{"A": "rock", "B": "paper", "C": "scissors"}
		points := map[string]int{"rock": 1, "paper": 2, "scissors": 3}
		beats := map[string]string{"rock": "scissors", "paper": "rock", "scissors": "paper"}
		loses := map[string]string{"rock": "paper", "paper": "scissors", "scissors": "rock"}

		// A for Rock
		// B for Paper
		// C for Scissors
		elf := letterToPlay[lineValues[0]]

		// X for Rock
		// Y for Paper
		// Z for Scissors
		myLetter := lineValues[1]

		switch myLetter {
		case "X":
			// I need to loose
			score += points[beats[elf]]
		case "Y":
			// I need to tie
			score += points[elf] + 3
		case "Z":
			// I need to win
			score += points[loses[elf]] + 6
		}
	}

	fmt.Println(score)
}
