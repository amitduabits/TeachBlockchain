const lessons = [
  {
    id: 'solidity-01-introduction',
    title: 'Introduction to Blockchain and Ethereum',
    description: 'Learn blockchain fundamentals and Ethereum basics.',
    content: `
# Introduction to Blockchain and Ethereum

Blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. Ethereum is a decentralized platform that runs smart contracts.

## What is Blockchain?

A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across the entire network of computer systems on the blockchain. Each block in the chain contains:

- **Data**: The actual information being stored
- **Hash**: A unique fingerprint of the block
- **Previous Hash**: The hash of the previous block

## Key Features of Blockchain

### 1. Decentralization
- No single point of control
- Distributed across multiple nodes
- Eliminates the need for intermediaries

### 2. Immutability
- Once data is recorded, it cannot be altered
- Cryptographic hashing ensures data integrity
- Consensus mechanisms prevent tampering

### 3. Transparency
- All transactions are visible to network participants
- Public blockchains are completely transparent
- Private blockchains can control visibility

### 4. Security
- Cryptographic algorithms secure the network
- Consensus mechanisms prevent attacks
- Distributed nature makes it resistant to failures

## What is Ethereum?

Ethereum is a decentralized platform that enables developers to build and deploy smart contracts and decentralized applications (DApps). Key features include:

### Smart Contracts
- Self-executing contracts with terms directly written into code
- Automatically execute when predetermined conditions are met
- Eliminate the need for intermediaries

### Ethereum Virtual Machine (EVM)
- Runtime environment for smart contracts
- Ensures code execution is isolated and secure
- Provides consistency across all nodes

### Ether (ETH)
- Native cryptocurrency of the Ethereum network
- Used to pay for transaction fees (gas)
- Can be used as a store of value

## Gas and Transactions

### Gas
- Unit of measurement for computational effort
- Required for every operation on Ethereum
- Prevents spam and ensures network stability

### Gas Price
- Amount of Ether paid per unit of gas
- Set by users when submitting transactions
- Higher gas price = faster transaction processing

### Gas Limit
- Maximum amount of gas a transaction can consume
- Prevents infinite loops and runaway code
- Protects users from excessive fees

## Ethereum Accounts

### Externally Owned Accounts (EOAs)
- Controlled by private keys
- Can initiate transactions
- Have ETH balances

### Contract Accounts
- Controlled by code
- Execute when called by transactions
- Have ETH balances and storage

## Development Tools

### Remix IDE
- Browser-based IDE for Solidity development
- Built-in compiler and debugger
- Easy deployment to testnets

### Hardhat
- Development environment for Ethereum
- Task runner and testing framework
- Local blockchain simulation

### Truffle
- Development framework for Ethereum
- Smart contract compilation and deployment
- Testing and migration tools

## Getting Started

To start developing on Ethereum, you'll need:

1. **Node.js**: JavaScript runtime environment
2. **npm/yarn**: Package managers
3. **Hardhat/Truffle**: Development frameworks
4. **MetaMask**: Browser wallet for testing
5. **Test ETH**: For testing on testnets

## Next Steps

In the upcoming lessons, we'll cover:
- Setting up your development environment
- Learning Solidity syntax
- Writing your first smart contract
- Testing and deploying contracts
- Building DeFi applications
    `,
    theory: `
## Blockchain Architecture

### Block Structure
\`\`\`
Block Header:
- Previous Block Hash
- Merkle Root
- Timestamp
- Nonce
- Difficulty Target

Block Body:
- Transaction List
- Merkle Tree
\`\`\`

### Consensus Mechanisms

#### Proof of Work (PoW)
- Miners compete to solve cryptographic puzzles
- First to solve gets to add the next block
- Requires significant computational power
- Used by Bitcoin and Ethereum (currently)

#### Proof of Stake (PoS)
- Validators are chosen based on stake (ETH held)
- More energy efficient than PoW
- Ethereum is transitioning to PoS (Ethereum 2.0)

### Merkle Trees
- Data structure used to efficiently verify data integrity
- Allows for quick verification of large datasets
- Used in blockchain to verify transactions

## Ethereum Network

### Mainnet
- The live Ethereum network
- Real ETH and real value
- Production environment

### Testnets
- **Goerli**: Proof of Authority testnet
- **Sepolia**: Proof of Work testnet
- **Rinkeby**: Deprecated testnet
- Free test ETH available

### Local Networks
- **Hardhat Network**: Local development
- **Ganache**: Personal blockchain
- **Anvil**: Foundry's local node

## Smart Contract Lifecycle

1. **Development**: Write contract in Solidity
2. **Compilation**: Convert to bytecode
3. **Testing**: Test on local/test networks
4. **Deployment**: Deploy to target network
5. **Interaction**: Call contract functions
6. **Upgrade**: Deploy new version (if upgradeable)

## Security Considerations

### Common Vulnerabilities
- **Reentrancy**: External calls before state updates
- **Integer Overflow/Underflow**: Arithmetic operations
- **Access Control**: Unauthorized function calls
- **Front-running**: Transaction ordering attacks

### Best Practices
- Use established libraries (OpenZeppelin)
- Implement proper access controls
- Test thoroughly
- Audit your code
- Follow the principle of least privilege
    `,
    examples: [
      {
        id: 'example-1',
        title: 'Simple Storage Contract',
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    event DataStored(uint256 data);
    
    function set(uint256 x) public {
        storedData = x;
        emit DataStored(x);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}`,
        explanation: 'This is a basic smart contract that stores and retrieves a single unsigned integer value. It demonstrates basic state management and events.'
      },
      {
        id: 'example-2',
        title: 'Token Contract Structure',
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicToken {
    mapping(address => uint256) public balances;
    uint256 public totalSupply;
    
    constructor(uint256 _totalSupply) {
        totalSupply = _totalSupply;
        balances[msg.sender] = _totalSupply;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }
}`,
        explanation: 'This example shows the basic structure of a token contract with balance tracking and transfer functionality.'
      }
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Hello World Contract',
        description: 'Create your first smart contract that stores and returns a greeting message.',
        instructions: [
          'Create a contract called HelloWorld',
          'Add a state variable to store a greeting message',
          'Create a function to set the greeting message',
          'Create a function to get the greeting message',
          'Add an event that emits when the greeting is set'
        ],
        starterCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    // Add your state variable here
    
    // Add your event here
    
    // Add your setter function here
    
    // Add your getter function here
}`,
        solution: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string private greeting;
    
    event GreetingSet(string newGreeting);
    
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
        emit GreetingSet(_greeting);
    }
    
    function getGreeting() public view returns (string memory) {
        return greeting;
    }
}`,
        tests: [
          {
            id: 'test-1',
            input: { function: 'setGreeting', args: ['Hello, Blockchain!'] },
            expectedOutput: 'success',
            description: 'Should set greeting message successfully'
          },
          {
            id: 'test-2',
            input: { function: 'getGreeting' },
            expectedOutput: 'Hello, Blockchain!',
            description: 'Should return the set greeting message'
          }
        ],
        hints: [
          'Use string type for the greeting message',
          'Make the setter function public',
          'Make the getter function public view',
          'Use memory keyword for string parameters'
        ],
        difficulty: 'beginner',
        estimatedTime: 15,
        order: 1
      }
    ],
    prerequisites: [],
    objectives: [
      'Understand blockchain fundamentals',
      'Learn about Ethereum and smart contracts',
      'Understand gas and transactions',
      'Learn about development tools',
      'Set up development environment'
    ],
    estimatedTime: 45,
    difficulty: 'beginner',
    order: 1
  }
];

module.exports = lessons;
