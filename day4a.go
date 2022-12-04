package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	path, _ := filepath.Abs("./inputs/day4")

	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(file)

	total := 0

	for scanner.Scan() {
		pairs := strings.Split(scanner.Text(), ",")
		fmt.Println("Pairs", pairs)
	}

	fmt.Println("Answer", total)
}
