import type { Skill } from "../types";

export const skills: Skill[] = [
  // Web3 & Blockchain
  {
    id: "solidity",
    name: "Solidity & Smart Contracts",
    description:
      "Writing secure, gas-optimized Ethereum smart contracts, ERC-20/721 token standards, and Hardhat testing suites.",
    icon: "Link",
    category: "web3",
  },
  {
    id: "blockchain",
    name: "Blockchain Architecture",
    description:
      "Exploring consensus algorithms (PoW, PoS, Raft), state machines, Merkle trees, and cryptographic hashing primitives.",
    icon: "BrainCircuit",
    category: "web3",
  },
  {
    id: "dapp",
    name: "DApp Development & Ethers.js",
    description:
      "Integrating decentralized Web3 frontends with MetaMask, wallet providers, and smart contract event listeners.",
    icon: "Globe",
    category: "web3",
  },
  // Programming Languages & Development
  {
    id: "typescript",
    name: "TypeScript",
    description:
      "Developing robust, type-safe full-stack web applications with advanced types, generics, and strict compile checks.",
    icon: "Code2",
    category: "development",
  },
  {
    id: "react",
    name: "React & Modern JavaScript",
    description:
      "Building high-performance, accessible responsive UIs using modern hooks, state management, and Framer Motion.",
    icon: "Monitor",
    category: "development",
  },
  {
    id: "python",
    name: "Python",
    description:
      "Crafting data automation pipelines, cryptographic algorithms, backend APIs, and financial blockchain analytics.",
    icon: "Code2",
    category: "development",
  },
  {
    id: "java",
    name: "Java",
    description:
      "Implementing object-oriented architectures, multithreaded concurrent systems, and complex enterprise algorithms.",
    icon: "Coffee",
    category: "development",
  },
  {
    id: "cpp",
    name: "C & C++",
    description:
      "Gaining low-level systems understanding, memory allocation, pointer manipulation, and competitive algorithmic logic.",
    icon: "Code2",
    category: "development",
  },
  // Foundations & Systems
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    description:
      "Mastering algorithmic problem-solving with trees, graphs, dynamic programming, sorting, and algorithmic complexity.",
    icon: "BrainCircuit",
    category: "foundations",
  },
  {
    id: "sql",
    name: "Database Systems & SQL",
    description:
      "Designing relational database schemas, complex analytical queries, indexing strategies, and transactional integrity.",
    icon: "Database",
    category: "foundations",
  },
  // Professional & Tooling
  {
    id: "git",
    name: "Git, GitHub & CI/CD",
    description:
      "Managing collaborative version control workflows, automated GitHub Actions pipelines, and code review practices.",
    icon: "GitBranch",
    category: "professional",
  },
  {
    id: "communication",
    name: "Technical Collaboration",
    description:
      "Communicating complex architectural concepts clearly, writing thorough documentation, and effective team problem-solving.",
    icon: "MessageSquare",
    category: "professional",
  },
];

export const skillCategories = [
  { key: "web3", label: "Web3 & Blockchain" },
  { key: "development", label: "Languages & Frameworks" },
  { key: "foundations", label: "Core CS & Foundations" },
  { key: "professional", label: "Tooling & Collaboration" },
] as const;
