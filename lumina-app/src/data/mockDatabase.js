export const seedUsers = [
  {
    id: 'usr_runaal',
    name: 'Runaal',
    username: 'runaal_dev',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Runaal&backgroundColor=8b5cf6',
    bio: 'Software Engineer and UI Designer building Lumina. Passionate about React, performance, and beautiful interfaces.',
    followers: 4520,
  },
  {
    id: 'usr_sarah',
    name: 'Sarah Drasner',
    username: 'sarahed',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=0ea5e9',
    bio: 'Staff Engineer & Speaker. I write about architecture and animations.',
    followers: 12400,
  },
  {
    id: 'usr_alex',
    name: 'Alex Xu',
    username: 'alex_system',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=3b82f6',
    bio: 'System Design fanatic. Drawing the internet.',
    followers: 21000,
  }
];

export const seedNotes = [
  {
    id: 'note_01',
    title: 'The Ultimate React Hooks Guide',
    excerpt: 'Detailed dive into useState, useEffect, useMemo, and useCallback. How to avoid common re-render traps and memory leaks.',
    content: 'React Hooks fundamentally changed how we write components. By moving away from class lifecycle methods, we gain composability. The most misunderstood hook is useEffect. Remember: useEffect is for synchronization with an external system, not for data transformation. If you can calculate a value during render, do it.',
    tags: ['React', 'Frontend'],
    authorId: 'usr_sarah',
    readingTime: '6 min read',
    upvotes: 342,
    createdAt: 1718000000000, // Unix timestamp for sorting
    createdAtText: '2 days ago'
  },
  {
    id: 'note_02',
    title: 'JavaScript Closures Explained (Visually)',
    excerpt: 'A mental model for understanding lexical scope and closures in JS. Why do variables persist, and how does the garbage collector handle them?',
    content: 'A closure is simply a function that remembers its outer variables. In JS, every function forms a closure. Think of a closure as a backpack that a function carries around. Inside this backpack are all the variables that were in scope when the function was defined. This explains why event listeners in a loop sometimes act weirdly with `var`.',
    tags: ['JavaScript', 'Basics'],
    authorId: 'usr_runaal',
    readingTime: '4 min read',
    upvotes: 891,
    createdAt: 1718200000000,
    createdAtText: '5 hrs ago'
  },
  {
    id: 'note_03',
    title: 'Data Structures Basics: Trees & Graphs',
    excerpt: 'Essential computer science algorithms for technical interviews. DFS, BFS, Binary Search Trees, and Heaps explained.',
    content: 'Graphs are nodes connected by edges. A tree is a directed acyclic graph where any two vertices are connected by exactly one path. Searching a graph requires either going deep (DFS) or wide (BFS). Use a Stack for DFS and a Queue for BFS. Binary Search Trees provide O(log n) lookup times if balanced.',
    tags: ['Algorithms', 'CS'],
    authorId: 'usr_alex',
    readingTime: '12 min read',
    upvotes: 567,
    createdAt: 1717000000000,
    createdAtText: '1 week ago'
  },
  {
    id: 'note_04',
    title: 'Building Node.js REST APIs from Scratch',
    excerpt: 'Setting up Express.js, routing, middleware, and connecting to PostgreSQL. Best practices for error handling and validation.',
    content: 'A robust REST API requires consistent error handling. Never leak database errors to the client. Create a centralized error handling middleware. For validation, use libraries like Zod or Joi at your route borders to guarantee the shape of incoming JSON. Status codes matter: 201 for Created, 400 for Bad Request, 404 for Not Found.',
    tags: ['Node.js', 'Backend', 'API'],
    authorId: 'usr_sarah',
    readingTime: '8 min read',
    upvotes: 215,
    createdAt: 1717800000000,
    createdAtText: '3 days ago'
  },
  {
    id: 'note_05',
    title: 'Framer Motion: The Missing Manual',
    excerpt: 'How to use spring physics, LayoutId magic, and staggered children variants to create interfaces that feel incredibly premium.',
    content: 'Framer Motion makes complex UI animations declarative. Instead of chained CSS transitions, we define states. Spring physics feel much more natural than CSS ease-in-out because they mimic real-world momentum. For shared element transitions (like a card expanding into a page), wrap both elements in `layoutId`.',
    tags: ['React', 'Animation', 'UI'],
    authorId: 'usr_runaal',
    readingTime: '5 min read',
    upvotes: 1120,
    createdAt: 1718300000000,
    createdAtText: 'Just now'
  },
  {
    id: 'note_06',
    title: 'Tailwind CSS Architecure at Scale',
    excerpt: 'Organizing complex Tailwind projects, creating a design system with utility classes, and custom plugin configuration.',
    content: 'Tailwind becomes messy if you dont extract repetitive components. However, extracting too early defeats the purpose of utility classes. The sweet spot: use `@apply` sparingly. Rely on React/Vue components as your abstraction layer. Extend your `tailwind.config.js` to define your core brand colors instead of hardcoding random hex values.',
    tags: ['CSS', 'Tailwind', 'Design'],
    authorId: 'usr_alex',
    readingTime: '7 min read',
    upvotes: 430,
    createdAt: 1717500000000,
    createdAtText: '4 days ago'
  },
  {
    id: 'note_07',
    title: 'Understanding PostgreSQL Indexing',
    excerpt: 'B-Trees, Hash Indexes, GIN, and GiST. How to optimize slow queries by reading EXPLAIN ANALYZE output.',
    content: 'An index is like a book glossary. Instead of scanning every page (Sequential Scan), the DB looks up the exact location. B-Tree is the default and good for most equality/range queries. For full-text search or JSONB, use GIN indexes. Always prefix your index test with `EXPLAIN ANALYZE` to see if the query planner actually uses it.',
    tags: ['Database', 'SQL', 'Backend'],
    authorId: 'usr_alex',
    readingTime: '9 min read',
    upvotes: 312,
    createdAt: 1718100000000,
    createdAtText: '1 day ago'
  },
  {
    id: 'note_08',
    title: 'System Design: Rate Limiting Algorithms',
    excerpt: 'Token Bucket, Leaky Bucket, and Sliding Window Counters. How Stripe and Discord handle millions of requests per second.',
    content: 'Rate limiting protects your services from abuse. Token Bucket allows for bursts of traffic but strictly limits the average rate. Redis is the standard datastore for rate limiters because of its speed and atomic INCR commands. For distributed systems, a Sliding Window Log provides perfectly accurate limiting but costs more memory.',
    tags: ['System Design', 'Backend'],
    authorId: 'usr_sarah',
    readingTime: '11 min read',
    upvotes: 680,
    createdAt: 1716000000000,
    createdAtText: '2 weeks ago'
  },
  {
    id: 'note_09',
    title: 'Vue 3 Composition API vs Options API',
    excerpt: 'A side-by-side comparison of reactivity, lifecycle hooks, and reusability when migrating to Vue 3.',
    content: 'The Options API (data, methods, computed) forces you to split logic by option type, rather than by feature. The Composition API (setup function with ref/reactive) allows you to group logical concerns together into composable functions. This is incredibly powerful for large scale applications where you need to share code between components cleanly.',
    tags: ['Vue', 'Frontend'],
    authorId: 'usr_runaal',
    readingTime: '6 min read',
    upvotes: 145,
    createdAt: 1717900000000,
    createdAtText: '2 days ago'
  },
  {
    id: 'note_10',
    title: 'Dockerizing Fullstack Applications',
    excerpt: 'Multi-stage Dockerfiles, Docker Compose, and networking basics for shipping your Node/React/Postgres stack.',
    content: 'Docker packages your application and its dependencies into an isolated container. A multi-stage build creates a temporary image to compile assets, and then copies only the final artifacts into a microscopic production image (like Alpine). Use `docker-compose.yml` to define your network so your Node app can talk to your Postgres container by just using `postgres:5432` as the DB_HOST.',
    tags: ['Docker', 'DevOps', 'Backend'],
    authorId: 'usr_alex',
    readingTime: '10 min read',
    upvotes: 520,
    createdAt: 1717200000000,
    createdAtText: '5 days ago'
  }
];

export const seedTags = ['All', 'React', 'Frontend', 'JavaScript', 'Basics', 'Algorithms', 'CS', 'Node.js', 'Backend', 'API', 'Animation', 'UI', 'CSS', 'Tailwind', 'Design', 'Database', 'SQL', 'System Design', 'Vue', 'Docker', 'DevOps'];
