package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func day8() {
	day8a()
	day8b()
}

func day8a() {
	path, _ := filepath.Abs("./inputs/day8")

	file, _ := os.Open(path)

	scanner := bufio.NewScanner(file)

	grid := make([][]int, 0)

	row := 0

	for scanner.Scan() {
		line := strings.Split(scanner.Text(), "")

		if len(grid) == 0 {
			grid = make([][]int, len(line))
			for i := range grid {
				grid[i] = make([]int, len(line))
			}
		}

		for j, height := range line {
			h, _ := strconv.Atoi(height)
			grid[row][j] = h
		}
		row++
	}

	visible := make([][]bool, len(grid))
	for i := range visible {
		visible[i] = make([]bool, len(grid))
	}

	for i, row := range grid {
		for j, height := range row {
			if i == 0 || j == 0 || i == len(grid)-1 || j == len(row)-1 {
				visible[i][j] = true
				continue
			}

			visible[i][j] = isTreeVisible(height, i, j, grid)
		}
	}

	// print2dbool(visible)
	// print2dint(grid)

	fmt.Println("[Part 1]", countTrue(visible))
}

func day8b() {
	path, _ := filepath.Abs("./inputs/day8")

	file, _ := os.Open(path)

	scanner := bufio.NewScanner(file)

	grid := make([][]int, 0)

	row := 0

	for scanner.Scan() {
		line := strings.Split(scanner.Text(), "")

		if len(grid) == 0 {
			grid = make([][]int, len(line))
			for i := range grid {
				grid[i] = make([]int, len(line))
			}
		}

		for j, height := range line {
			h, _ := strconv.Atoi(height)
			grid[row][j] = h
		}
		row++
	}

	viewingDistances := make([][]int, len(grid))
	for i := range viewingDistances {
		viewingDistances[i] = make([]int, len(grid))
	}

	for i, row := range grid {
		for j, height := range row {
			viewingDistances[i][j] = getViewingDistance(height, i, j, grid)
		}
	}

	// print2dint(grid)
	// print2dint(viewingDistances)

	fmt.Println("[Part 2]", max2d(viewingDistances))
}

func getViewingDistance(height int, row int, col int, grid [][]int) int {
	treesToLeft := grid[row][0:col]
	treesToRight := grid[row][col+1 : len(grid[row])]
	treesAbove := getTreesAbove(row, col, grid)
	treesBelow := getTreesBelow(row, col, grid)

	viewDistanceLeft := getDistanceFromLeft(height, treesToLeft)
	viewDistanceRight := getDistanceFromRight(height, treesToRight)
	viewDistanceAbove := getDistanceFromLeft(height, treesAbove)
	viewDistanceBelow := getDistanceFromRight(height, treesBelow)

	return viewDistanceLeft * viewDistanceRight * viewDistanceAbove * viewDistanceBelow

}

func isTreeVisible(height int, row int, col int, grid [][]int) bool {
	treesToLeft := grid[row][0:col]
	treesToRight := grid[row][col+1 : len(grid[row])]
	treesAbove := getTreesAbove(row, col, grid)
	treesBelow := getTreesBelow(row, col, grid)

	return max(treesToLeft) < height ||
		max(treesToRight) < height ||
		max(treesAbove) < height ||
		max(treesBelow) < height
}

func getDistanceFromRight(height int, trees []int) int {
	for i, val := range trees {
		if val >= height {
			return i + 1
		}
	}
	return len(trees)
}

func getDistanceFromLeft(height int, trees []int) int {
	for i := len(trees) - 1; i >= 0; i-- {
		if trees[i] >= height {
			return len(trees) - i
		}
	}
	return len(trees)
}

func getTreesAbove(r int, col int, grid [][]int) []int {
	trees := make([]int, 0)

	for i, row := range grid {
		for j, height := range row {
			if j == col && i < r {
				trees = append(trees, height)
			}
		}
	}

	return trees
}

func getTreesBelow(r int, col int, grid [][]int) []int {
	trees := make([]int, 0)

	for i, row := range grid {
		for j, height := range row {
			if j == col && i > r {
				trees = append(trees, height)
			}
		}
	}

	return trees
}

func countTrue(visible [][]bool) int {
	total := 0

	for _, row := range visible {
		for _, visible := range row {
			if visible {
				total++
			}
		}
	}

	return total
}

func print2dbool(arr [][]bool) {
	for _, val := range arr {
		fmt.Println(val)
	}
}

func print2dint(arr [][]int) {
	for _, val := range arr {
		fmt.Println(val)
	}
}

func max(arr []int) int {
	if len(arr) == 0 {
		return 0
	}

	max := arr[0]
	for i := 1; i < len(arr); i++ {
		if arr[i] > max {
			max = arr[i]
		}
	}
	return max
}

func max2d(arr [][]int) int {
	max := arr[0][0]

	for _, row := range arr {
		for _, value := range row {
			if value > max {
				max = value
			}
		}
	}

	return max
}
