class Stack {
    constructor() {
        this.items = []; // Array to hold stack elements
    }

    // Add an item to the stack
    push(element) {
        this.items.push(element);
    }

    // Remove and return the top item of the stack
    pop() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items.pop();
    }

    // Peek at the top item of the stack
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items[this.items.length - 1];
    }

    // Check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the size of the stack
    size() {
        return this.items.length;
    }

    // Print the stack elements
    print() {
        console.log(this.items.join(' '));
    }
}

// Example usage:

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek()); // Output: 30 (top of the stack)
console.log(stack.pop());  // Output: 30 (removes and returns the top item)
console.log(stack.size()); // Output: 2 (size of the stack)

stack.print(); // Output: 10 20 (remaining items in the stack)
