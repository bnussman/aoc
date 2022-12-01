package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strconv"
)

func main() {
	path, _ := filepath.Abs("./inputs/day1")

	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(file)

	i := 0
	m := make(map[int]int)

	max := 0
	elf := 0

	for scanner.Scan() {
		line := scanner.Text()
		value, _ := strconv.Atoi(line)

		if line == "" {
			i++
		} else {
			total, found := m[i]

			if found {
				m[i] = total + value
			} else {
				m[i] = value
			}

			if m[i] > max {
				max = m[i]
				elf = i + 1
			}
		}
	}

	fmt.Println("[Part 1] The answer is elf", elf, "with", max)

	// Begin Part 2
	values := make([]int, 0, len(m))

	for _, v := range m {
		values = append(values, v)
	}

	sort.Ints(values)

	lastThreeValues := values[len(values)-3:]

	fmt.Println("[Part 2] The answer is", sum(lastThreeValues))
}

func sum(array []int) int {
	result := 0
	for _, v := range array {
		result += v
	}
	return result
}
