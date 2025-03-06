// Set Stack Countructor For Data Structure

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

// Code Implementation of Poetry Assistent Algorithm

import readline from 'node:readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fetchWordList = async (url) => {
    // Fetch the word list from the given URL
    const response = await fetch(url);
    const text = await response.text();
    return text.split('\n'); // Split into array by line
};

const createWordStacks = (words) => {
    // Convert words into stack-like structure (array of characters)
    // Iterrate through words
    return words.map(word => {
        // Utilize Stack Data Structure
        const stack = new Stack();
        for (let i = 0; i < word.length; i++) {
            stack.push(word[i]);
        }
        return stack;
    });
};

const getPossibleRhymes = (wordStacks, inputStack) => {
    let possible_rhymes = [];
    // Iterate through the letters on the inputed word
    let numberIter = inputStack.size() - 1;
    for (let letterInputWord = numberIter; letterInputWord >= 0 ; letterInputWord--) {
        let test_words = [];
        if (letterInputWord == numberIter) {
            test_words = wordStacks;
        }
        else {
            test_words = possible_rhymes[numberIter - letterInputWord - 1];
        }
        let layer_rhymes = [];
        for (let word_position = test_words.length - 1; word_position >= 0; word_position--){
            if (test_words[word_position].peek() == inputStack.peek()){
                test_words[word_position].pop();
                if (!test_words[word_position].isEmpty()){
                    layer_rhymes.push(test_words[word_position]);
                }
            }
        }
        possible_rhymes.push(layer_rhymes);
        inputStack.pop();
    }
    return possible_rhymes;
}

const getMatchingWords = (inputWord, amountOfWords, possible_rhymes) => {
    let returnList = []
    let originalSubstring = 0;
    while (returnList.length < amountOfWords) {
        let depth = Math.floor(Math.random() * (possible_rhymes.length - 1));
        
        // Make sure that we're not accessing an undefined array
        let item = possible_rhymes.length - depth - 1;
        if (possible_rhymes[item]) {
            let randomNumber = Math.floor(Math.random() * (possible_rhymes[item].length - 1));
    
            // Transform stack back to word
            if (possible_rhymes[item].length > 0) {
                let stack = possible_rhymes[item][randomNumber];
                let word = '';
                for (let index = stack.size() - 1; index >= 0; index--) {
                    word = stack.peek() + word;
                    stack.pop();
                }
                if (inputWord != word + inputWord.substring(depth + originalSubstring - 1)){
                    returnList.push(word + inputWord.substring(depth + originalSubstring - 1));
                }
                possible_rhymes[item].splice(randomNumber, 1);
            }
        } else {
            // If there is no words on this group
            possible_rhymes.pop();
            originalSubstring = originalSubstring + 1;
            if (possible_rhymes.length === 0) {
                break;
            }
        }
    }
    return returnList;
}

const findRhymes = (inputWord, wordStacks, amountOfWords) => {
    // Convert input word into a stack
    const inputStack = new Stack();
    for (let i = 0; i < inputWord.length; i++) {
        inputStack.push(inputWord[i]);
    }
    // Set up
    let possible_rhymes = getPossibleRhymes(wordStacks, inputStack);
    // Get the matching words
    return getMatchingWords(inputWord, amountOfWords, possible_rhymes);
};

const fetchWordStackList = async () => {
    const url = 'https://introcs.cs.princeton.edu/java/data/wordlist.txt'; // Wordlist URL
    const wordList = await fetchWordList(url);
    return await createWordStacks(wordList);
};

// Main function to run the assistant
const runPoetryAssistant = async () => {
    // Part 1: Generate list of words
    const wordStacks = await fetchWordStackList();  // Await the result from the async function

    // Part 2: Fetch desired word and compare to List
    rl.question("Enter a word to find rhymes: ", response => {
        const amountOfWords = 10;
        const rhymes = findRhymes(response, wordStacks, amountOfWords);

        // Part 3: Return 6 options
        console.log("Suggested rhymes for '" + response + "':");
        console.log(rhymes);

        // Close the readline interface after input is processed
        rl.close();
    });
};

await runPoetryAssistant();
