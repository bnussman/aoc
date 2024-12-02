package main

import (
	"log"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	day1()
}

func day1() {
	file, err := os.ReadFile("./examples/day1")

	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(string(file), "\n")

	list1 := make([]int, len(lines))
	list2 := make([]int, len(lines))

	for i, v := range lines {
		list1[i], _ = strconv.Atoi(strings.Fields(v)[0])
		list2[i], _ = strconv.Atoi(strings.Fields(v)[1])
	}

	sort.Ints(list1)
	sort.Ints(list2)

	total := 0

	for i, v := range list1 {
		total += int(math.Abs(float64(v - list2[i])))
	}

	print(total)
}
