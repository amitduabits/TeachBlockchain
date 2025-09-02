const lessons = [
  {
    id: 'js-01-variables-functions',
    title: 'Variables and Functions',
    description: 'Learn about JavaScript variables, function declarations, and expressions.',
    content: `
# Variables and Functions in JavaScript

JavaScript is a dynamically typed language, which means you don't need to specify the data type when declaring variables. Let's explore the different ways to declare variables and create functions.

## Variable Declarations

### var (Legacy)
\`\`\`javascript
var name = "John";
var age = 25;
var isStudent = true;
\`\`\`

### let (Block-scoped)
\`\`\`javascript
let name = "John";
let age = 25;
let isStudent = true;
\`\`\`

### const (Constant)
\`\`\`javascript
const name = "John";
const age = 25;
const isStudent = true;
\`\`\`

## Function Declarations

### Function Declaration
\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

### Function Expression
\`\`\`javascript
const greet = function(name) {
  return "Hello, " + name + "!";
};
\`\`\`

### Arrow Function (ES6+)
\`\`\`javascript
const greet = (name) => {
  return "Hello, " + name + "!";
};

// Shorthand for single expression
const greet = name => "Hello, " + name + "!";
\`\`\`

## Key Differences

- **var**: Function-scoped, can be redeclared, hoisted
- **let**: Block-scoped, cannot be redeclared, not hoisted
- **const**: Block-scoped, cannot be redeclared or reassigned, not hoisted

## Best Practices

1. Use \`const\` by default
2. Use \`let\` when you need to reassign
3. Avoid \`var\` in modern JavaScript
4. Use descriptive variable names
5. Follow camelCase naming convention
    `,
    theory: `
## Variable Hoisting

JavaScript hoists variable declarations to the top of their scope. This means you can use a variable before it's declared, but only with \`var\`.

\`\`\`javascript
console.log(x); // undefined (not an error)
var x = 5;

console.log(y); // ReferenceError
let y = 5;
\`\`\`

## Function Hoisting

Function declarations are also hoisted, meaning you can call a function before it's declared.

\`\`\`javascript
greet("John"); // "Hello, John!"

function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

## Scope

- **Global Scope**: Variables declared outside any function
- **Function Scope**: Variables declared inside a function (var)
- **Block Scope**: Variables declared inside curly braces (let, const)

\`\`\`javascript
if (true) {
  var functionScoped = "I'm function scoped";
  let blockScoped = "I'm block scoped";
}

console.log(functionScoped); // "I'm function scoped"
console.log(blockScoped); // ReferenceError
\`\`\`
    `,
    examples: [
      {
        id: 'example-1',
        title: 'Variable Declarations',
        code: `// Different ways to declare variables
const name = "Alice";
let age = 30;
var city = "New York";

// Reassignment
age = 31; // OK with let
// name = "Bob"; // Error with const

console.log(name, age, city);`,
        explanation: 'This example shows the different variable declaration keywords and their behavior with reassignment.'
      },
      {
        id: 'example-2',
        title: 'Function Types',
        code: `// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
const multiply = function(a, b) {
  return a * b;
};

// Arrow function
const divide = (a, b) => a / b;

console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
console.log(divide(10, 2)); // 5`,
        explanation: 'This example demonstrates the three main ways to create functions in JavaScript.'
      }
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Variable Practice',
        description: 'Create variables for a user profile and display them.',
        instructions: [
          'Create a const variable for the user\'s name',
          'Create a let variable for the user\'s age',
          'Create a const variable for the user\'s email',
          'Log all variables to the console'
        ],
        starterCode: `// Create your variables here
// const name = 
// let age = 
// const email = 

// Log the variables
console.log();`,
        solution: `// Create your variables here
const name = "John Doe";
let age = 25;
const email = "john.doe@example.com";

// Log the variables
console.log(name, age, email);`,
        tests: [
          {
            id: 'test-1',
            input: {},
            expectedOutput: 'John Doe 25 john.doe@example.com',
            description: 'Should log the user profile variables'
          }
        ],
        hints: [
          'Use const for values that won\'t change',
          'Use let for values that might change',
          'Use console.log() to display the variables'
        ],
        difficulty: 'beginner',
        estimatedTime: 5,
        order: 1
      },
      {
        id: 'exercise-2',
        title: 'Function Creation',
        description: 'Create different types of functions to perform calculations.',
        instructions: [
          'Create a function declaration called \'square\' that takes a number and returns its square',
          'Create a function expression called \'cube\' that takes a number and returns its cube',
          'Create an arrow function called \'power\' that takes two numbers and returns the first raised to the power of the second',
          'Test all functions with sample values'
        ],
        starterCode: `// Function declaration
function square() {
  // Your code here
}

// Function expression
const cube = function() {
  // Your code here
};

// Arrow function
const power = () => {
  // Your code here
};

// Test the functions
console.log(square(4)); // Should output 16
console.log(cube(3)); // Should output 27
console.log(power(2, 8)); // Should output 256`,
        solution: `// Function declaration
function square(num) {
  return num * num;
}

// Function expression
const cube = function(num) {
  return num * num * num;
};

// Arrow function
const power = (base, exponent) => {
  return Math.pow(base, exponent);
};

// Test the functions
console.log(square(4)); // Should output 16
console.log(cube(3)); // Should output 27
console.log(power(2, 8)); // Should output 256`,
        tests: [
          {
            id: 'test-1',
            input: { test: 'square' },
            expectedOutput: '16',
            description: 'Square function should return 16 for input 4'
          },
          {
            id: 'test-2',
            input: { test: 'cube' },
            expectedOutput: '27',
            description: 'Cube function should return 27 for input 3'
          },
          {
            id: 'test-3',
            input: { test: 'power' },
            expectedOutput: '256',
            description: 'Power function should return 256 for inputs 2 and 8'
          }
        ],
        hints: [
          'Remember to include parameters in your function definitions',
          'Use the return statement to return values',
          'For the power function, you can use Math.pow() or the ** operator'
        ],
        difficulty: 'beginner',
        estimatedTime: 10,
        order: 2
      }
    ],
    prerequisites: [],
    objectives: [
      'Understand different variable declaration keywords',
      'Learn function declaration and expression syntax',
      'Master arrow function syntax',
      'Understand variable and function hoisting',
      'Learn about scope in JavaScript'
    ],
    estimatedTime: 30,
    difficulty: 'beginner',
    order: 1
  }
];

module.exports = lessons;
