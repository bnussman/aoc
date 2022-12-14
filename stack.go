package main

import "fmt"

type (
	Stack struct {
		top    *node
		length int
	}
	node struct {
		value interface{}
		prev  *node
	}
)

// Create a new stack
func New() *Stack {
	return &Stack{nil, 0}
}

// Return the number of items in the stack
func (this *Stack) Len() int {
	return this.length
}

func (this *Stack) Print() {
	node := this.top
	for node != nil {
		fmt.Print(node.value)
		node = node.prev
	}
	fmt.Print("\n")
}

func (this *Stack) ToArray() []string {
	array := make([]string, this.length)
	idx := this.length - 1
	node := this.top

	for node != nil {
		array[idx] = node.value.(string)
		idx--
		node = node.prev
	}
	return array
}

// View the top item on the stack
func (this *Stack) Peek() interface{} {
	if this.length == 0 {
		return nil
	}
	return this.top.value
}

// Pop the top item of the stack and return it
func (this *Stack) Pop() interface{} {
	if this.length == 0 {
		return nil
	}

	n := this.top
	this.top = n.prev
	this.length--
	return n.value
}

// Push a value onto the top of the stack
func (this *Stack) Push(value interface{}) {
	n := &node{value, this.top}
	this.top = n
	this.length++
}

func (this *Stack) Reverse() *Stack {
	reversedCrate := new(Stack)
	val := this.Pop()
	for val != nil {
		reversedCrate.Push(val)
		val = this.Pop()
	}

	return reversedCrate
}
