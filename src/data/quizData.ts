export const quizData: Record<string, {
  name: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
  writtenQuestions?: Array<{
    id: string;
    question: string;
  }>;
}> = {
  "ds": {
    name: "Data Structures",
    questions: [
      {
        id: "ds1",
        question: "Which data structure uses LIFO (Last In First Out) principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctAnswer: "Stack"
      },
      {
        id: "ds2",
        question: "What is the time complexity of accessing an element in an array?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(1)"
      },
      {
        id: "ds3",
        question: "Which of the following is not a linear data structure?",
        options: ["Array", "Linked List", "Queue", "Tree"],
        correctAnswer: "Tree"
      },
      {
        id: "ds4",
        question: "What is the worst case time complexity for searching an element in a Binary Search Tree?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: "O(n)"
      },
      {
        id: "ds5",
        question: "Which data structure is best suited for implementing a priority queue?",
        options: ["Stack", "Queue", "Heap", "Linked List"],
        correctAnswer: "Heap"
      },
      {
        id: "ds6",
        question: "Which sorting algorithm has the best average case performance?",
        options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
        correctAnswer: "Quick Sort"
      },
      {
        id: "ds7",
        question: "A full binary tree with n leaves contains how many nodes?",
        options: ["n", "2n", "2n-1", "2n+1"],
        correctAnswer: "2n-1"
      },
      {
        id: "ds8",
        question: "Which of the following is not an advantage of using linked lists over arrays?",
        options: ["Dynamic size", "Ease of insertion/deletion", "Random access", "No memory wastage"],
        correctAnswer: "Random access"
      },
      {
        id: "ds9",
        question: "What data structure would you use to check if a syntax has balanced parentheses?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        correctAnswer: "Stack"
      },
      {
        id: "ds10",
        question: "What is the time complexity of heapify operation?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(log n)"
      }
    ],
    writtenQuestions: [
      {
        id: "ds_written1",
        question: "Explain how a hash table works and what strategies can be used to handle collisions."
      },
      {
        id: "ds_written2",
        question: "Compare and contrast the time complexity and use cases of Quick Sort and Merge Sort algorithms."
      }
    ]
  },
  "csa": {
    name: "Computer Systems and Architecture",
    questions: [
      {
        id: "csa1",
        question: "What is the function of the ALU in a CPU?",
        options: ["Storage", "Arithmetic and logic operations", "Input/Output control", "Memory management"],
        correctAnswer: "Arithmetic and logic operations"
      },
      {
        id: "csa2",
        question: "Which memory is faster?",
        options: ["Hard Disk", "RAM", "Cache", "Register"],
        correctAnswer: "Register"
      },
      {
        id: "csa3",
        question: "What does RISC stand for?",
        options: ["Reduced Instruction Set Computer", "Random Instruction Set Computing", "Rapid Instruction Set Configuration", "Regular Instruction Set Control"],
        correctAnswer: "Reduced Instruction Set Computer"
      },
      {
        id: "csa4",
        question: "What is pipelining in computer architecture?",
        options: ["A memory optimization technique", "A technique to execute multiple instructions simultaneously", "A network communication protocol", "A disk storage format"],
        correctAnswer: "A technique to execute multiple instructions simultaneously"
      },
      {
        id: "csa5",
        question: "Which of the following is not a type of computer bus?",
        options: ["Data bus", "Address bus", "Control bus", "Serial bus"],
        correctAnswer: "Serial bus"
      },
      {
        id: "csa6",
        question: "What is the primary purpose of an operating system?",
        options: ["Run applications", "Manage hardware resources", "Provide user interface", "All of the above"],
        correctAnswer: "All of the above"
      },
      {
        id: "csa7",
        question: "What is the Von Neumann bottleneck?",
        options: ["CPU speed limitation", "Limited memory capacity", "The data transfer limitation between CPU and memory", "Power consumption issues"],
        correctAnswer: "The data transfer limitation between CPU and memory"
      },
      {
        id: "csa8",
        question: "Which of the following is a non-volatile memory?",
        options: ["RAM", "Cache", "Register", "ROM"],
        correctAnswer: "ROM"
      },
      {
        id: "csa9",
        question: "What does the acronym BIOS stand for?",
        options: ["Basic Input Output System", "Binary Input Output System", "Basic Internal Operating System", "Binary Integrated Operating System"],
        correctAnswer: "Basic Input Output System"
      },
      {
        id: "csa10",
        question: "What is a cache hit?",
        options: ["When data is successfully written to cache", "When requested data is found in cache", "When cache memory is full", "When cache needs to be refreshed"],
        correctAnswer: "When requested data is found in cache"
      }
    ],
    writtenQuestions: [
      {
        id: "csa_written1",
        question: "Explain the concept of pipelining in CPU design and how it improves performance."
      },
      {
        id: "csa_written2",
        question: "Describe the memory hierarchy in modern computer systems and why it's important."
      }
    ]
  },
  "cn": {
    name: "Computer Networks",
    questions: [
      {
        id: "cn1",
        question: "Which layer of the OSI model is responsible for end-to-end communication?",
        options: ["Transport Layer", "Network Layer", "Data Link Layer", "Session Layer"],
        correctAnswer: "Transport Layer"
      },
      {
        id: "cn2",
        question: "What is the maximum length of a UTP cable before signal degradation?",
        options: ["100 meters", "200 meters", "500 meters", "1 kilometer"],
        correctAnswer: "100 meters"
      },
      {
        id: "cn3",
        question: "Which protocol is used for secure web browsing?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correctAnswer: "HTTPS"
      },
      {
        id: "cn4",
        question: "What is the purpose of DNS?",
        options: ["File transfer", "Email transmission", "Domain name to IP address resolution", "Data encryption"],
        correctAnswer: "Domain name to IP address resolution"
      },
      {
        id: "cn5",
        question: "Which of the following is not a private IP address range?",
        options: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "216.58.0.0/16"],
        correctAnswer: "216.58.0.0/16"
      },
      {
        id: "cn6",
        question: "What does MAC address stand for?",
        options: ["Memory Access Control", "Media Access Control", "Multiple Access Control", "Main Access Control"],
        correctAnswer: "Media Access Control"
      },
      {
        id: "cn7",
        question: "Which protocol is connectionless?",
        options: ["TCP", "UDP", "HTTP", "FTP"],
        correctAnswer: "UDP"
      },
      {
        id: "cn8",
        question: "Which device operates at the Data Link Layer?",
        options: ["Router", "Switch", "Hub", "Firewall"],
        correctAnswer: "Switch"
      },
      {
        id: "cn9",
        question: "What is the purpose of ICMP?",
        options: ["File transfer", "Email delivery", "Error reporting and diagnostics", "Web browsing"],
        correctAnswer: "Error reporting and diagnostics"
      },
      {
        id: "cn10",
        question: "Which of the following is the fastest transmission media?",
        options: ["Coaxial cable", "Twisted pair cable", "Fiber optic cable", "Wireless"],
        correctAnswer: "Fiber optic cable"
      }
    ],
    writtenQuestions: [
      {
        id: "cn_written1",
        question: "Explain the difference between TCP and UDP protocols and when you would use each one."
      },
      {
        id: "cn_written2",
        question: "Describe how the DNS system works and its importance in the functioning of the internet."
      }
    ]
  },
  "dbms": {
    name: "Database Management Systems",
    questions: [
      {
        id: "dbms1",
        question: "Which normal form eliminates transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswer: "3NF"
      },
      {
        id: "dbms2",
        question: "What does ACID stand for in database transactions?",
        options: ["Atomicity, Consistency, Isolation, Durability", "Atomicity, Control, Integrity, Durability", "Aggregation, Consistency, Isolation, Durability", "Authentication, Consistency, Isolation, Distribution"],
        correctAnswer: "Atomicity, Consistency, Isolation, Durability"
      },
      {
        id: "dbms3",
        question: "Which of the following is not a type of database model?",
        options: ["Relational", "Network", "Hierarchical", "Sequential"],
        correctAnswer: "Sequential"
      },
      {
        id: "dbms4",
        question: "Which SQL statement is used to create a new database?",
        options: ["CREATE DATABASE", "NEW DATABASE", "ADD DATABASE", "MAKE DATABASE"],
        correctAnswer: "CREATE DATABASE"
      },
      {
        id: "dbms5",
        question: "What is a foreign key?",
        options: ["A key used to encrypt data", "A key from another country", "A field that links two tables", "A backup key"],
        correctAnswer: "A field that links two tables"
      },
      {
        id: "dbms6",
        question: "Which of the following is not a valid SQL join type?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "MIDDLE JOIN"],
        correctAnswer: "MIDDLE JOIN"
      },
      {
        id: "dbms7",
        question: "What is the purpose of the HAVING clause in SQL?",
        options: ["To filter rows before grouping", "To filter groups after grouping", "To sort results", "To limit the number of results"],
        correctAnswer: "To filter groups after grouping"
      },
      {
        id: "dbms8",
        question: "Which of the following is not a database indexing technique?",
        options: ["B-tree", "Hash", "R-tree", "X-tree"],
        correctAnswer: "X-tree"
      },
      {
        id: "dbms9",
        question: "What does DDL stand for in the context of SQL?",
        options: ["Data Definition Language", "Data Design Language", "Database Definition Language", "Dynamic Data Language"],
        correctAnswer: "Data Definition Language"
      },
      {
        id: "dbms10",
        question: "Which technique is used to avoid deadlocks in DBMS?",
        options: ["Two-phase locking", "UNDO logging", "Timestamp ordering", "All of the above"],
        correctAnswer: "All of the above"
      }
    ],
    writtenQuestions: [
      {
        id: "dbms_written1",
        question: "Explain the concept of database normalization and why it's important."
      },
      {
        id: "dbms_written2",
        question: "Describe the ACID properties in database transactions and their significance."
      }
    ]
  },
  "daa": {
    name: "Design and Analysis of Algorithms",
    questions: [
      {
        id: "daa1",
        question: "What is the time complexity of binary search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(log n)"
      },
      {
        id: "daa2",
        question: "Which of the following is not a greedy algorithm?",
        options: ["Kruskal's algorithm", "Dijkstra's algorithm", "Quicksort", "Huffman coding"],
        correctAnswer: "Quicksort"
      },
      {
        id: "daa3",
        question: "What problem does the Bellman-Ford algorithm solve?",
        options: ["Single-source shortest paths with negative edges", "Minimum spanning tree", "Maximum flow", "Pattern matching"],
        correctAnswer: "Single-source shortest paths with negative edges"
      },
      {
        id: "daa4",
        question: "Which sorting algorithm has the worst case time complexity of O(n²)?",
        options: ["Merge sort", "Heap sort", "Quick sort", "Radix sort"],
        correctAnswer: "Quick sort"
      },
      {
        id: "daa5",
        question: "Which of the following is not an application of dynamic programming?",
        options: ["Longest common subsequence", "Matrix chain multiplication", "Shortest path in a graph", "Finding prime numbers"],
        correctAnswer: "Finding prime numbers"
      },
      {
        id: "daa6",
        question: "What is the recurrence relation for the Fibonacci sequence?",
        options: ["F(n) = F(n-1) + F(n-2)", "F(n) = F(n-1) * F(n-2)", "F(n) = 2*F(n-1)", "F(n) = F(n-1) + 1"],
        correctAnswer: "F(n) = F(n-1) + F(n-2)"
      },
      {
        id: "daa7",
        question: "Which data structure is used in breadth-first search?",
        options: ["Stack", "Queue", "Tree", "Hash table"],
        correctAnswer: "Queue"
      },
      {
        id: "daa8",
        question: "What is the best case time complexity of bubble sort?",
        options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
        correctAnswer: "O(n)"
      },
      {
        id: "daa9",
        question: "Which of the following is a divide-and-conquer algorithm?",
        options: ["Dijkstra's algorithm", "Merge sort", "Greedy knapsack", "Prim's algorithm"],
        correctAnswer: "Merge sort"
      },
      {
        id: "daa10",
        question: "The Master Theorem is used for solving which type of recurrences?",
        options: ["Linear recurrences", "Divide-and-conquer recurrences", "Dynamic programming recurrences", "All recurrences"],
        correctAnswer: "Divide-and-conquer recurrences"
      }
    ],
    writtenQuestions: [
      {
        id: "daa_written1",
        question: "Explain the divide and conquer paradigm and give an example of an algorithm that uses it."
      },
      {
        id: "daa_written2",
        question: "Describe how dynamic programming works and when it's appropriate to use it."
      }
    ]
  },
  "dm": {
    name: "Discrete Mathematics",
    questions: [
      {
        id: "dm1",
        question: "Which of the following is not a logical connective?",
        options: ["AND", "OR", "NOT", "WHY"],
        correctAnswer: "WHY"
      },
      {
        id: "dm2",
        question: "What is the contrapositive of 'If p, then q'?",
        options: ["If q, then p", "If not p, then not q", "If not q, then not p", "p if and only if q"],
        correctAnswer: "If not q, then not p"
      },
      {
        id: "dm3",
        question: "What is the cardinality of the power set of a set with n elements?",
        options: ["n", "n²", "2ⁿ", "n!"],
        correctAnswer: "2ⁿ"
      },
      {
        id: "dm4",
        question: "Which of the following is an example of a binary relation?",
        options: ["Addition", "The set of all even numbers", "Less than", "Prime numbers"],
        correctAnswer: "Less than"
      },
      {
        id: "dm5",
        question: "If a graph has n vertices and n-1 edges and is connected, what type of graph is it?",
        options: ["Complete graph", "Tree", "Cycle", "Bipartite graph"],
        correctAnswer: "Tree"
      },
      {
        id: "dm6",
        question: "What is the negation of ∀x P(x)?",
        options: ["∀x ¬P(x)", "¬∀x P(x)", "∃x ¬P(x)", "¬∃x P(x)"],
        correctAnswer: "∃x ¬P(x)"
      },
      {
        id: "dm7",
        question: "Which of the following is not an equivalence relation property?",
        options: ["Reflexive", "Symmetric", "Transitive", "Antisymmetric"],
        correctAnswer: "Antisymmetric"
      },
      {
        id: "dm8",
        question: "What is the chromatic number of a complete graph with n vertices?",
        options: ["1", "2", "n", "n-1"],
        correctAnswer: "n"
      },
      {
        id: "dm9",
        question: "In how many ways can you arrange the letters of the word 'MISSISSIPPI'?",
        options: ["11!", "11!/4!4!2!", "11!/2!2!", "11!/2!"],
        correctAnswer: "11!/4!4!2!"
      },
      {
        id: "dm10",
        question: "Which of the following is a valid recurrence relation for the Fibonacci sequence?",
        options: ["F(n) = F(n-1) * F(n-2)", "F(n) = F(n-1) + F(n-2)", "F(n) = 2*F(n-1)", "F(n) = F(n-1) - F(n-2)"],
        correctAnswer: "F(n) = F(n-1) + F(n-2)"
      }
    ],
    writtenQuestions: [
      {
        id: "dm_written1",
        question: "Explain the concept of mathematical induction and provide a simple example."
      },
      {
        id: "dm_written2",
        question: "Describe what a graph is in discrete mathematics and explain some of its important properties."
      }
    ]
  },
  "oops": {
    name: "Object Oriented Programming using Java",
    questions: [
      {
        id: "oops1",
        question: "Which of the following is not a principle of OOP?",
        options: ["Encapsulation", "Inheritance", "Polymorphism", "Segregation"],
        correctAnswer: "Segregation"
      },
      {
        id: "oops2",
        question: "What is the output of System.out.println(\"Hello\" + 1 + 2);",
        options: ["Hello12", "Hello3", "3Hello", "Error"],
        correctAnswer: "Hello12"
      },
      {
        id: "oops3",
        question: "Which keyword is used to inherit a class in Java?",
        options: ["inherits", "extends", "implements", "using"],
        correctAnswer: "extends"
      },
      {
        id: "oops4",
        question: "Which of the following is not a valid access modifier in Java?",
        options: ["public", "private", "protected", "friend"],
        correctAnswer: "friend"
      },
      {
        id: "oops5",
        question: "What is the default value of an instance variable of type int in Java?",
        options: ["0", "1", "null", "undefined"],
        correctAnswer: "0"
      },
      {
        id: "oops6",
        question: "Which of the following statements is correct about abstract classes?",
        options: ["Abstract classes can be instantiated", "Abstract classes cannot have constructors", "Abstract classes can have abstract methods", "Abstract classes cannot be extended"],
        correctAnswer: "Abstract classes can have abstract methods"
      },
      {
        id: "oops7",
        question: "What is method overloading?",
        options: ["Having multiple methods with the same name but different parameters", "Having two methods with the same signature in the same class", "Overriding a method in a subclass", "None of the above"],
        correctAnswer: "Having multiple methods with the same name but different parameters"
      },
      {
        id: "oops8",
        question: "Which of the following is a marker interface in Java?",
        options: ["Runnable", "Serializable", "Comparable", "Cloneable"],
        correctAnswer: "Serializable"
      },
      {
        id: "oops9",
        question: "What is the purpose of 'super' keyword in Java?",
        options: ["To call the superclass method", "To refer to the superclass instance variable", "To call the superclass constructor", "All of the above"],
        correctAnswer: "All of the above"
      },
      {
        id: "oops10",
        question: "What will be the output of System.out.println(10 + 20 + \"Hello\");",
        options: ["30Hello", "10 + 20 + Hello", "1020Hello", "Compilation Error"],
        correctAnswer: "30Hello"
      }
    ],
    writtenQuestions: [
      {
        id: "oops_written1",
        question: "Explain the concept of polymorphism in OOP and provide a simple example."
      },
      {
        id: "oops_written2",
        question: "Describe the difference between abstract classes and interfaces in Java."
      }
    ]
  },
  "cprog": {
    name: "C Programming",
    questions: [
      {
        id: "cprog1",
        question: "Which of the following is not a valid C data type?",
        options: ["int", "float", "string", "char"],
        correctAnswer: "string"
      },
      {
        id: "cprog2",
        question: "What is the output of printf(\"%d\", sizeof(int));",
        options: ["2", "4", "8", "Depends on the compiler"],
        correctAnswer: "Depends on the compiler"
      },
      {
        id: "cprog3",
        question: "Which of the following is used to dynamically allocate memory in C?",
        options: ["new", "malloc()", "alloc()", "memalloc()"],
        correctAnswer: "malloc()"
      },
      {
        id: "cprog4",
        question: "What is the correct way to declare a pointer to an integer in C?",
        options: ["int ptr;", "int *ptr;", "pointer int ptr;", "int ptr*;"],
        correctAnswer: "int *ptr;"
      },
      {
        id: "cprog5",
        question: "Which operator is used to access the value at the address stored in a pointer variable?",
        options: ["*", "&", "->", "."],
        correctAnswer: "*"
      },
      {
        id: "cprog6",
        question: "What is the default storage class for local variables in C?",
        options: ["auto", "extern", "static", "register"],
        correctAnswer: "auto"
      },
      {
        id: "cprog7",
        question: "What will happen if you try to free a memory block twice in C?",
        options: ["Memory leak", "Buffer overflow", "Undefined behavior", "Nothing"],
        correctAnswer: "Undefined behavior"
      },
      {
        id: "cprog8",
        question: "Which of the following is not a valid way to declare an array in C?",
        options: ["int arr[10];", "int arr[] = {1, 2, 3};", "int arr[3] = {1, 2, 3};", "int arr = {1, 2, 3};"],
        correctAnswer: "int arr = {1, 2, 3};"
      },
      {
        id: "cprog9",
        question: "In C, which function is used to read a character from the standard input?",
        options: ["scanf()", "getchar()", "getc()", "Both B and C"],
        correctAnswer: "Both B and C"
      },
      {
        id: "cprog10",
        question: "Which of the following is not a valid file opening mode in C?",
        options: ["r", "w", "a", "e"],
        correctAnswer: "e"
      }
    ],
    writtenQuestions: [
      {
        id: "cprog_written1",
        question: "Explain the concept of pointers in C and their importance."
      },
      {
        id: "cprog_written2",
        question: "Describe the difference between static and dynamic memory allocation in C."
      }
    ]
  },
  "flat": {
    name: "Formal Language and Automata Theory",
    questions: [
      {
        id: "flat1",
        question: "Which of the following is not a type of automaton?",
        options: ["Finite Automaton", "Pushdown Automaton", "Linear Automaton", "Turing Machine"],
        correctAnswer: "Linear Automaton"
      },
      {
        id: "flat2",
        question: "What does DFA stand for?",
        options: ["Deterministic Final Automaton", "Deterministic Finite Automaton", "Direct Finite Automaton", "Discrete Formal Automaton"],
        correctAnswer: "Deterministic Finite Automaton"
      },
      {
        id: "flat3",
        question: "Which automaton is equivalent in power to a regular expression?",
        options: ["Turing Machine", "Pushdown Automaton", "Finite Automaton", "None of the above"],
        correctAnswer: "Finite Automaton"
      },
      {
        id: "flat4",
        question: "Which of the following languages cannot be recognized by a finite automaton?",
        options: ["a*b*", "a^n b^n where n ≥ 1", "(ab)*", "a*ba*"],
        correctAnswer: "a^n b^n where n ≥ 1"
      },
      {
        id: "flat5",
        question: "Which of the following is true about context-free languages?",
        options: ["All regular languages are context-free", "All context-free languages are regular", "Context-free languages are a subset of regular languages", "None of the above"],
        correctAnswer: "All regular languages are context-free"
      },
      {
        id: "flat6",
        question: "What type of grammar is needed to generate a context-free language?",
        options: ["Type 0", "Type 1", "Type 2", "Type 3"],
        correctAnswer: "Type 2"
      },
      {
        id: "flat7",
        question: "Which of the following is a closure property of regular languages?",
        options: ["Union", "Intersection", "Kleene star", "All of the above"],
        correctAnswer: "All of the above"
      },
      {
        id: "flat8",
        question: "The pumping lemma is used to:",
        options: ["Prove a language is regular", "Prove a language is context-free", "Prove a language is not regular", "Generate a grammar for a language"],
        correctAnswer: "Prove a language is not regular"
      },
      {
        id: "flat9",
        question: "Which of the following is equivalent to a Turing machine in computational power?",
        options: ["Lambda calculus", "Post machine", "Random access machine", "All of the above"],
        correctAnswer: "All of the above"
      },
      {
        id: "flat10",
        question: "Which of the following problems is undecidable?",
        options: ["Whether a DFA accepts a particular string", "Whether a PDA accepts a particular string", "Whether a Turing machine halts on a particular input", "Whether two DFAs accept the same language"],
        correctAnswer: "Whether a Turing machine halts on a particular input"
      }
    ],
    writtenQuestions: [
      {
        id: "flat_written1",
        question: "Explain the difference between a DFA and an NFA and their relationship."
      },
      {
        id: "flat_written2",
        question: "Describe what a context-free grammar is and provide a simple example."
      }
    ]
  },
  "se": {
    name: "Software Engineering",
    questions: [
      {
        id: "se1",
        question: "Which of the following is not a software development lifecycle model?",
        options: ["Waterfall model", "Spiral model", "Agile model", "Assembly model"],
        correctAnswer: "Assembly model"
      },
      {
        id: "se2",
        question: "Which of the following is not a principle of Agile Manifesto?",
        options: ["Individuals and interactions over processes and tools", "Working software over comprehensive documentation", "Contract negotiation over customer collaboration", "Responding to change over following a plan"],
        correctAnswer: "Contract negotiation over customer collaboration"
      },
      {
        id: "se3",
        question: "What does SRS stand for in software engineering?",
        options: ["Software Requirement Specification", "System Requirement Software", "Software Requirement Service", "System Requirement Specification"],
        correctAnswer: "Software Requirement Specification"
      },
      {
        id: "se4",
        question: "Which of the following is not a type of software testing?",
        options: ["Unit testing", "Integration testing", "System testing", "Design testing"],
        correctAnswer: "Design testing"
      },
      {
        id: "se5",
        question: "Which design principle suggests that a class should have only one reason to change?",
        options: ["Open/Closed Principle", "Liskov Substitution Principle", "Single Responsibility Principle", "Dependency Inversion Principle"],
        correctAnswer: "Single Responsibility Principle"
      },
      {
        id: "se6",
        question: "Which of the following is a black box testing technique?",
        options: ["Statement coverage", "Branch coverage", "Equivalence partitioning", "Path coverage"],
        correctAnswer: "Equivalence partitioning"
      },
      {
        id: "se7",
        question: "Which UML diagram is best suited for modeling the dynamic behavior of a system?",
        options: ["Class diagram", "Use case diagram", "Sequence diagram", "Component diagram"],
        correctAnswer: "Sequence diagram"
      },
      {
        id: "se8",
        question: "What is a user story in Agile?",
        options: ["A detailed technical specification", "A fictional narrative about users", "A simple description of a feature from a user's perspective", "A bug report from a user"],
        correctAnswer: "A simple description of a feature from a user's perspective"
      },
      {
        id: "se9",
        question: "Which of the following is a key characteristic of DevOps?",
        options: ["Manual testing", "Waterfall development", "Separation of development and operations", "Continuous integration"],
        correctAnswer: "Continuous integration"
      },
      {
        id: "se10",
        question: "Which software metric measures the number of independent paths through a program's source code?",
        options: ["Lines of code", "Cyclomatic complexity", "Halstead complexity", "Function points"],
        correctAnswer: "Cyclomatic complexity"
      }
    ],
    writtenQuestions: [
      {
        id: "se_written1",
        question: "Explain the differences between the Waterfall and Agile methodologies in software development."
      },
      {
        id: "se_written2",
        question: "Describe the importance of software testing and different testing techniques."
      }
    ]
  },
  "py": {
    name: "Python Programming",
    questions: [
      {
        id: "py1",
        question: "What is the output of print(2 ** 3 ** 2)?",
        options: ["64", "512", "36", "None of the above"],
        correctAnswer: "512"
      },
      {
        id: "py2",
        question: "Which of the following is not a Python built-in data type?",
        options: ["list", "tuple", "array", "dictionary"],
        correctAnswer: "array"
      },
      {
        id: "py3",
        question: "How do you create a list comprehension that squares each element in a list?",
        options: ["[x^2 for x in lst]", "[x*x for x in lst]", "[square(x) for x in lst]", "[for x in lst: x*x]"],
        correctAnswer: "[x*x for x in lst]"
      },
      {
        id: "py4",
        question: "What does the 'self' keyword refer to in a Python class?",
        options: ["The class itself", "The current instance of the class", "The parent class", "The main module"],
        correctAnswer: "The current instance of the class"
      },
      {
        id: "py5",
        question: "Which of the following is the correct way to define a lambda function?",
        options: ["lambda x: return x*x", "lambda x => x*x", "lambda x -> x*x", "lambda x: x*x"],
        correctAnswer: "lambda x: x*x"
      },
      {
        id: "py6",
        question: "What is the output of print(list(filter(lambda x: x%2==0, range(10))))?",
        options: ["[0, 2, 4, 6, 8]", "[1, 3, 5, 7, 9]", "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]", "[]"],
        correctAnswer: "[0, 2, 4, 6, 8]"
      },
      {
        id: "py7",
        question: "Which of the following is used to handle exceptions in Python?",
        options: ["try-catch", "try-except", "catch-throw", "try-handle"],
        correctAnswer: "try-except"
      },
      {
        id: "py8",
        question: "What is the difference between append() and extend() methods in a list?",
        options: ["No difference", "append() adds an element, extend() adds multiple elements", "append() adds at the beginning, extend() adds at the end", "append() adds an element or list as a single item, extend() adds each element of the list individually"],
        correctAnswer: "append() adds an element or list as a single item, extend() adds each element of the list individually"
      },
      {
        id: "py9",
        question: "Which of the following is not a Python decorator?",
        options: ["@classmethod", "@staticmethod", "@abstractmethod", "@virtualmethod"],
        correctAnswer: "@virtualmethod"
      },
      {
        id: "py10",
        question: "What is the output of print('Hello'[::-1])?",
        options: ["Hello", "olleH", "H e l l o", "o l l e H"],
        correctAnswer: "olleH"
      }
    ],
    writtenQuestions: [
      {
        id: "py_written1",
        question: "Explain the concept of list comprehensions in Python and provide an example."
      },
      {
        id: "py_written2",
        question: "Describe the difference between Python lists, tuples, and dictionaries."
      }
    ]
  },
  "cd": {
    name: "Compiler Design",
    questions: [
      {
        id: "cd1",
        question: "Which of the following is not a phase of a compiler?",
        options: ["Lexical analysis", "Syntax analysis", "Code optimization", "Code execution"],
        correctAnswer: "Code execution"
      },
      {
        id: "cd2",
        question: "What does a lexical analyzer do?",
        options: ["Checks for syntax errors", "Generates intermediate code", "Converts source code to tokens", "Performs code optimization"],
        correctAnswer: "Converts source code to tokens"
      },
      {
        id: "cd3",
        question: "Which data structure is commonly used for symbol table implementation?",
        options: ["Array", "Stack", "Queue", "Hash table"],
        correctAnswer: "Hash table"
      },
      {
        id: "cd4",
        question: "What is a parse tree?",
        options: ["A tree representation of the lexical structure", "A tree representation of the syntactic structure", "A tree representation of the semantic structure", "A tree representation of the code optimization"],
        correctAnswer: "A tree representation of the syntactic structure"
      },
      {
        id: "cd5",
        question: "Which of the following is not a bottom-up parsing technique?",
        options: ["LR parsing", "Shift-reduce parsing", "Recursive descent parsing", "Operator precedence parsing"],
        correctAnswer: "Recursive descent parsing"
      },
      {
        id: "cd6",
        question: "What does DAG stand for in code optimization?",
        options: ["Directed Acyclic Graph", "Direct Action Graph", "Data Action Graph", "Dynamic Acyclic Graph"],
        correctAnswer: "Directed Acyclic Graph"
      },
      {
        id: "cd7",
        question: "Which of the following is not a code optimization technique?",
        options: ["Constant folding", "Loop unrolling", "Dead code elimination", "Code encryption"],
        correctAnswer: "Code encryption"
      },
      {
        id: "cd8",
        question: "What is the role of a code generator in a compiler?",
        options: ["To generate tokens from source code", "To generate parse trees", "To generate intermediate code", "To generate target machine code"],
        correctAnswer: "To generate target machine code"
      },
      {
        id: "cd9",
        question: "Which of the following is a left-to-right, rightmost derivation parser?",
        options: ["LL parser", "LR parser", "LALR parser", "SLR parser"],
        correctAnswer: "LR parser"
      },
      {
        id: "cd10",
        question: "What is a peephole optimization?",
        options: ["Optimizing the entire program at once", "Optimizing each function separately", "Optimizing small segments of code", "Optimizing loops only"],
        correctAnswer: "Optimizing small segments of code"
      }
    ],
    writtenQuestions: [
      {
        id: "cd_written1",
        question: "Explain the phases of compilation and their functions."
      },
      {
        id: "cd_written2",
        question: "Describe what lexical analysis is and the role of a lexical analyzer in a compiler."
      }
    ]
  },
  "os": {
    name: "Operating Systems",
    questions: [
      {
        id: "os1",
        question: "Which of the following is not a function of an operating system?",
        options: ["Memory management", "Process management", "File management", "Database management"],
        correctAnswer: "Database management"
      },
      {
        id: "os2",
        question: "What is thrashing in an operating system?",
        options: ["A high rate of page faults", "A high rate of process creation", "A high rate of context switching", "A high rate of system crashes"],
        correctAnswer: "A high rate of page faults"
      },
      {
        id: "os3",
        question: "Which scheduling algorithm might lead to starvation?",
        options: ["Round Robin", "First Come First Served", "Shortest Job First", "Shortest Remaining Time First"],
        correctAnswer: "Shortest Job First"
      },
      {
        id: "os4",
        question: "What is a critical section in concurrent programming?",
        options: ["A section of code that must be executed by multiple processes simultaneously", "A section of code that cannot be interrupted", "A section of code that accesses shared resources", "A section of code that contains critical bugs"],
        correctAnswer: "A section of code that accesses shared resources"
      },
      {
        id: "os5",
        question: "Which of the following is not a deadlock prevention strategy?",
        options: ["Resource allocation graph", "Banker's algorithm", "Resource ordering", "Process termination"],
        correctAnswer: "Resource allocation graph"
      },
      {
        id: "os6",
        question: "Which page replacement algorithm suffers from Belady's anomaly?",
        options: ["FIFO", "LRU", "Optimal", "All of the above"],
        correctAnswer: "FIFO"
      },
      {
        id: "os7",
        question: "What is the main advantage of a multilevel feedback queue scheduling algorithm?",
        options: ["Simplicity", "Fairness", "Adaptability", "Predictability"],
        correctAnswer: "Adaptability"
      },
      {
        id: "os8",
        question: "Which of the following is not a memory allocation technique?",
        options: ["Paging", "Segmentation", "Virtual memory", "Fragmentation"],
        correctAnswer: "Fragmentation"
      },
      {
        id: "os9",
        question: "What does TLB stand for in memory management?",
        options: ["Translation Lookaside Buffer", "Time Location Buffer", "Table Lookup Buffer", "Tertiary Location Bitmap"],
        correctAnswer: "Translation Lookaside Buffer"
      },
      {
        id: "os10",
        question: "Which of the following is not a disk scheduling algorithm?",
        options: ["FCFS", "SCAN", "C-SCAN", "LRU"],
        correctAnswer: "LRU"
      }
    ],
    writtenQuestions: [
      {
        id: "os_written1",
        question: "Explain the concept of process scheduling and compare two scheduling algorithms."
      },
      {
        id: "os_written2",
        question: "Describe what deadlocks are and strategies to handle them in operating systems."
      }
    ]
  }
};
