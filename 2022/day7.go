package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

type Folder struct {
	Children []string
	Size     int
}

func day7() {
	path, _ := filepath.Abs("./inputs/day7")

	file, _ := os.Open(path)

	scanner := bufio.NewScanner(file)

	stack := new(Stack)

	directories := make(map[string]Folder)

	currentdir := "/"

	for scanner.Scan() {
		line := scanner.Text()

		if isCommand(line) {
			command := strings.Split(line, " ")[1:]

			switch command[0] {
			case "ls":
			case "cd":
				if command[1] == ".." {
					stack.Pop()
				} else if command[1] == "/" {
					for stack.length > 0 {
						stack.Pop()
					}
				} else {
					stack.Push(command[1])
				}

				currentdir = "/" + strings.Join(stack.ToArray(), "/")
			}
		} else {
			contents := strings.Split(line, " ")

			_, found := directories[currentdir]

			if !found {
				directories[currentdir] = Folder{Size: 0, Children: make([]string, 0)}
			}

			if contents[0] == "dir" {
				addedChild := ""
				if currentdir == "/" {
					addedChild = "/" + contents[1]
				} else {
					addedChild = currentdir + "/" + contents[1]
				}
				newChildrenArray := append(directories[currentdir].Children, addedChild)
				directories[currentdir] = Folder{Size: directories[currentdir].Size, Children: newChildrenArray}
			} else {
				val, _ := strconv.Atoi(contents[0])

				directories[currentdir] = Folder{Size: directories[currentdir].Size + val, Children: directories[currentdir].Children}
			}
		}
	}

	total := 0
	for _, folder := range directories {
		size := getSizeOfFolder(folder, directories)
		if size <= 100000 {
			total += size
		}
	}
	fmt.Println("[Part 1]", total)

	directoriesfinal := make(map[string]int)

	for key, folder := range directories {
		size := getSizeOfFolder(folder, directories)
		directoriesfinal[key] = size
	}

	smallest := directoriesfinal["/"]
	smallestdir := "idk"

	availableSpace := 70000000 - directoriesfinal["/"]
	minimumNeededSpace := 30000000
	needed := minimumNeededSpace - availableSpace

	for folder, size := range directoriesfinal {
		if needed < size && size < smallest {
			smallest = size
			smallestdir = folder
		}
	}

	fmt.Println("[Part 2]", smallest, smallestdir)
}

func isCommand(line string) bool {
	return strings.HasPrefix(line, "$")
}

func getSizeOfFolder(folder Folder, directories map[string]Folder) int {
	size := folder.Size

	if len(folder.Children) > 0 {
		for _, foldername := range folder.Children {
			size += getSizeOfFolderByString(foldername, directories)
		}
	}

	return size
}

func getSizeOfFolderByString(f string, directories map[string]Folder) int {
	for key, folder := range directories {
		if key == f {
			return getSizeOfFolder(folder, directories)
		}
	}
	fmt.Println("ON NO")
	return 0
}
