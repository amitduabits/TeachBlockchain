# API Documentation

This document provides comprehensive API documentation for the TeachBlockchain platform.

## Base URL

```
Production: https://yourdomain.com/api
Development: http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "data": {}, // or null
  "message": "string",
  "error": "string" // only present on errors
}
```

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Authentication Endpoints

### Register User

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "level": 1,
    "experience": 0
  }
}
```

### Login User

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "level": 1,
    "experience": 0
  }
}
```

### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "level": 5,
    "experience": 450,
    "completedLessons": ["lesson-id-1", "lesson-id-2"],
    "completedExercises": ["exercise-id-1"],
    "completedProjects": [],
    "streak": 7,
    "preferences": {
      "theme": "dark",
      "fontSize": 14
    }
  }
}
```

### Logout User

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Lesson Endpoints

### Get All Modules

```http
GET /api/lessons/modules
```

**Response:**
```json
{
  "success": true,
  "modules": [
    {
      "id": "javascript-fundamentals",
      "title": "JavaScript Fundamentals",
      "description": "Master modern JavaScript...",
      "lessons": ["lesson-id-1", "lesson-id-2"],
      "projects": ["project-id-1"],
      "estimatedTime": 1200,
      "difficulty": "beginner",
      "order": 1
    }
  ]
}
```

### Get Single Module

```http
GET /api/lessons/modules/:moduleId
```

**Response:**
```json
{
  "success": true,
  "module": {
    "id": "javascript-fundamentals",
    "title": "JavaScript Fundamentals",
    "description": "Master modern JavaScript...",
    "lessons": [
      {
        "id": "js-01-variables-functions",
        "title": "Variables and Functions",
        "description": "Learn about JavaScript variables...",
        "order": 1
      }
    ],
    "projects": [
      {
        "id": "js-project-01-calculator",
        "title": "JavaScript Calculator",
        "description": "Build a fully functional calculator...",
        "estimatedTime": 180,
        "difficulty": "beginner",
        "order": 1
      }
    ]
  }
}
```

### Get Lesson

```http
GET /api/lessons/modules/:moduleId/lessons/:lessonId
```

**Response:**
```json
{
  "success": true,
  "lesson": {
    "id": "js-01-variables-functions",
    "title": "Variables and Functions",
    "description": "Learn about JavaScript variables...",
    "content": "# Variables and Functions in JavaScript...",
    "theory": "## Variable Hoisting...",
    "examples": [
      {
        "id": "example-1",
        "title": "Variable Declarations",
        "code": "const name = \"Alice\";...",
        "explanation": "This example shows..."
      }
    ],
    "exercises": [
      {
        "id": "exercise-1",
        "title": "Variable Practice",
        "description": "Create variables for a user profile...",
        "instructions": ["Create a const variable..."],
        "starterCode": "// Create your variables here...",
        "tests": [
          {
            "id": "test-1",
            "input": {},
            "expectedOutput": "John Doe 25 john.doe@example.com",
            "description": "Should log the user profile variables"
          }
        ],
        "hints": ["Use const for values that won't change..."],
        "difficulty": "beginner",
        "estimatedTime": 5
      }
    ],
    "estimatedTime": 30,
    "difficulty": "beginner"
  }
}
```

### Get Exercise

```http
GET /api/lessons/modules/:moduleId/exercises/:exerciseId
```

**Response:**
```json
{
  "success": true,
  "exercise": {
    "id": "exercise-1",
    "title": "Variable Practice",
    "description": "Create variables for a user profile...",
    "instructions": ["Create a const variable..."],
    "starterCode": "// Create your variables here...",
    "tests": [
      {
        "id": "test-1",
        "input": {},
        "expectedOutput": "John Doe 25 john.doe@example.com",
        "description": "Should log the user profile variables"
      }
    ],
    "hints": ["Use const for values that won't change..."],
    "difficulty": "beginner",
    "estimatedTime": 5
  }
}
```

### Run Tests

```http
POST /api/lessons/run-tests
```

**Request Body:**
```json
{
  "code": "const name = \"John Doe\";\nconsole.log(name);",
  "tests": [
    {
      "id": "test-1",
      "input": {},
      "expectedOutput": "John Doe",
      "description": "Should log the name"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "testId": "test-1",
      "passed": true,
      "output": "John Doe",
      "error": null
    }
  ]
}
```

### Submit Exercise

```http
POST /api/lessons/modules/:moduleId/exercises/:exerciseId/submit
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "code": "const name = \"John Doe\";\nconsole.log(name);",
  "testResults": [
    {
      "testId": "test-1",
      "passed": true,
      "output": "John Doe",
      "error": null
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "score": 100,
  "completed": true,
  "message": "Exercise completed successfully!"
}
```

## Progress Endpoints

### Get User Progress

```http
GET /api/progress
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "progress": {
    "userId": "user-id",
    "totalLessons": 15,
    "completedLessons": 8,
    "totalExercises": 25,
    "completedExercises": 12,
    "totalProjects": 3,
    "completedProjects": 1,
    "totalTimeSpent": 1200,
    "currentLevel": 3,
    "experience": 250,
    "streak": 5,
    "moduleProgress": [
      {
        "moduleId": "javascript-fundamentals",
        "title": "JavaScript Fundamentals",
        "completedLessons": 8,
        "totalLessons": 15,
        "completedExercises": 12,
        "totalExercises": 25,
        "completedProjects": 1,
        "totalProjects": 3,
        "progress": 65,
        "timeSpent": 800,
        "lastAccessed": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### Complete Lesson

```http
POST /api/progress/lessons
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "moduleId": "javascript-fundamentals",
  "lessonId": "js-01-variables-functions",
  "timeSpent": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lesson completed successfully!",
  "experienceGained": 10,
  "levelUp": {
    "oldLevel": 2,
    "newLevel": 3,
    "leveledUp": true
  }
}
```

### Complete Exercise

```http
POST /api/progress/exercises
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "moduleId": "javascript-fundamentals",
  "exerciseId": "exercise-1",
  "code": "const name = \"John Doe\";\nconsole.log(name);",
  "testResults": [
    {
      "testId": "test-1",
      "passed": true,
      "output": "John Doe",
      "error": null
    }
  ],
  "timeSpent": 15,
  "attempts": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Exercise completed successfully!",
  "score": 100,
  "completed": true,
  "experienceGained": 15
}
```

### Get Leaderboard

```http
GET /api/progress/leaderboard
```

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "userId": "user-id-1",
      "name": "Alice Johnson",
      "avatar": "/uploads/avatars/avatar-1.jpg",
      "level": 8,
      "experience": 750,
      "completedLessons": 25,
      "completedExercises": 45,
      "completedProjects": 5,
      "streak": 12,
      "rank": 1
    }
  ]
}
```

## User Endpoints

### Get User Profile

```http
GET /api/users/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "/uploads/avatars/avatar-123.jpg",
    "level": 5,
    "experience": 450,
    "completedLessons": ["lesson-id-1", "lesson-id-2"],
    "completedExercises": ["exercise-id-1"],
    "completedProjects": ["project-id-1"],
    "streak": 7,
    "preferences": {
      "theme": "dark",
      "codeEditorTheme": "vs-dark",
      "fontSize": 14,
      "tabSize": 2,
      "wordWrap": true,
      "minimap": true
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update User Profile

```http
PUT /api/users/profile
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "preferences": {
    "theme": "light",
    "fontSize": 16
  }
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Smith",
    "email": "john@example.com",
    "preferences": {
      "theme": "light",
      "codeEditorTheme": "vs-light",
      "fontSize": 16,
      "tabSize": 2,
      "wordWrap": true,
      "minimap": true
    }
  }
}
```

### Upload Avatar

```http
POST /api/users/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```
Form data with 'avatar' file field
```

**Response:**
```json
{
  "success": true,
  "avatar": "/uploads/avatars/avatar-123.jpg",
  "message": "Avatar uploaded successfully"
}
```

### Change Password

```http
PUT /api/users/password
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## Code Execution Endpoints

### Execute JavaScript

```http
POST /api/code/execute/javascript
```

**Request Body:**
```json
{
  "code": "console.log('Hello, World!');"
}
```

**Response:**
```json
{
  "success": true,
  "output": "Hello, World!\n",
  "error": null,
  "executionTime": 0
}
```

### Execute Solidity

```http
POST /api/code/execute/solidity
```

**Request Body:**
```json
{
  "code": "pragma solidity ^0.8.0;\ncontract HelloWorld {\n    string public greeting;\n}",
  "testCases": [
    {
      "id": "test-1",
      "input": {},
      "expectedOutput": "success",
      "description": "Contract should compile"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "testId": "test-1",
      "passed": true,
      "output": "Mock execution result",
      "error": null
    }
  ],
  "executionTime": 0
}
```

### Validate Code

```http
POST /api/code/validate
```

**Request Body:**
```json
{
  "code": "const name = 'John';",
  "language": "javascript"
}
```

**Response:**
```json
{
  "success": true,
  "isValid": true,
  "error": null
}
```

### Format Code

```http
POST /api/code/format
```

**Request Body:**
```json
{
  "code": "const name='John';console.log(name);",
  "language": "javascript"
}
```

**Response:**
```json
{
  "success": true,
  "formattedCode": "const name = 'John';\nconsole.log(name);"
}
```

## Blockchain Endpoints

### Get Network Information

```http
GET /api/blockchain/network
```

**Response:**
```json
{
  "success": true,
  "network": {
    "chainId": 1,
    "name": "Ethereum Mainnet",
    "rpcUrl": "https://mainnet.infura.io/v3/your-project-id",
    "blockNumber": 18000000,
    "gasPrice": "20000000000",
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    }
  }
}
```

### Deploy Contract

```http
POST /api/blockchain/deploy
```

**Request Body:**
```json
{
  "contractCode": "pragma solidity ^0.8.0;\ncontract MyContract {\n    uint256 public value;\n}",
  "constructorArgs": []
}
```

**Response:**
```json
{
  "success": true,
  "contractAddress": "0x1234567890123456789012345678901234567890",
  "transactionHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "gasUsed": "150000",
  "blockNumber": 18000001
}
```

### Call Contract

```http
POST /api/blockchain/call
```

**Request Body:**
```json
{
  "contractAddress": "0x1234567890123456789012345678901234567890",
  "method": "value",
  "args": []
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "value": "Mock result value",
    "gasUsed": "21000",
    "transactionHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
  }
}
```

### Get Transaction

```http
GET /api/blockchain/transactions/:txHash
```

**Response:**
```json
{
  "success": true,
  "transaction": {
    "hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "from": "0x1234567890123456789012345678901234567890",
    "to": "0x0987654321098765432109876543210987654321",
    "value": "1000000000000000000",
    "gas": "21000",
    "gasPrice": "20000000000",
    "blockNumber": 18000001,
    "blockHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "transactionIndex": 0,
    "status": "success"
  }
}
```

### Get Balance

```http
GET /api/blockchain/balance/:address
```

**Response:**
```json
{
  "success": true,
  "balance": {
    "address": "0x1234567890123456789012345678901234567890",
    "balance": "1000000000000000000",
    "balanceFormatted": "1.0",
    "currency": "ETH"
  }
}
```

### Send Transaction

```http
POST /api/blockchain/send
```

**Request Body:**
```json
{
  "to": "0x0987654321098765432109876543210987654321",
  "amount": "1000000000000000000",
  "data": "0x"
}
```

**Response:**
```json
{
  "success": true,
  "transaction": {
    "hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "from": "0x1234567890123456789012345678901234567890",
    "to": "0x0987654321098765432109876543210987654321",
    "value": "1000000000000000000",
    "data": "0x",
    "gas": "21000",
    "gasPrice": "20000000000",
    "nonce": 42,
    "status": "pending"
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **General API**: 100 requests per 15 minutes per IP
- **Login endpoint**: 5 requests per minute per IP
- **Code execution**: 20 requests per minute per user

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## WebSocket Events

For real-time features, the API supports WebSocket connections:

### Connection

```javascript
const ws = new WebSocket('ws://localhost:5000/ws');
```

### Events

- `progress_update`: User progress updates
- `lesson_completed`: Lesson completion notifications
- `achievement_unlocked`: Achievement notifications
- `price_update`: Real-time price updates (for trading features)

### Example

```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'progress_update':
      console.log('Progress updated:', data.progress);
      break;
    case 'lesson_completed':
      console.log('Lesson completed:', data.lesson);
      break;
  }
};
```
