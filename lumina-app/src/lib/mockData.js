export const currentUser = {
  id: 'usr_runaal',
  name: 'Runaal',
  username: 'runaal',
  avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Runaal&backgroundColor=8b5cf6',
  stats: {
    notes: 24,
    upvotes: 1405,
    followers: 284,
  }
};

export const categories = [
  { id: 'cat_1', name: 'Computer Science', color: 'text-blue-400 bg-blue-500/10 ring-blue-500/20' },
  { id: 'cat_2', name: 'Software Engineering', color: 'text-violet-400 bg-violet-500/10 ring-violet-500/20' },
  { id: 'cat_3', name: 'UI/UX Design', color: 'text-pink-400 bg-pink-500/10 ring-pink-500/20' },
  { id: 'cat_4', name: 'Mathematics', color: 'text-amber-400 bg-amber-500/10 ring-amber-500/20' },
  { id: 'cat_5', name: 'System Architecture', color: 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20' },
];

export const trendingNotes = [
  {
    id: 'note_101',
    title: 'Advanced React Patterns for Enterprise Apps',
    contentPreview: 'In this comprehensive guide, we cover compound components, custom hooks for state machines, and proper React Query usage to avoid waterfall requests...',
    author: { name: 'Sarah Drasner', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=0ea5e9', role: 'Staff Engineer' },
    category: categories[1],
    stats: { upvotes: 3420, comments: 128, views: '12.4k' },
    timeAgo: '2 days ago',
    readTime: '14 min read',
    featured: true,
    coverGradient: 'from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20',
  },
  {
    id: 'note_102',
    title: 'Complete System Design Hand-drawn Cheat Sheet',
    contentPreview: 'Visualizing Load Balancers, API Gateways, Microservices, and Database Sharding. I digitized my iPad notes for interviews...',
    author: { name: 'Alex Xu', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=10b981', role: 'Architect' },
    category: categories[4],
    stats: { upvotes: 2815, comments: 84, views: '8.1k' },
    timeAgo: '4 days ago',
    readTime: '8 min read',
    featured: true,
    coverGradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
  },
  {
    id: 'note_103',
    title: 'Understanding Distributed Systems Fundamentals',
    contentPreview: 'CAP Theorem, PACELC, Consensus Algorithms (Raft/Paxos). These are the notes I used to clear the L6 Google interview.',
    author: { name: 'Kai Nakamura', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kai&backgroundColor=f59e0b', role: 'Backend Dev' },
    category: categories[0],
    stats: { upvotes: 1940, comments: 56, views: '5.2k' },
    timeAgo: '1 week ago',
    readTime: '11 min read',
    featured: true,
    coverGradient: 'from-orange-500/20 via-amber-500/20 to-red-500/20',
  }
];

export const feedNotes = [
  {
    id: 'note_001',
    title: 'Mastering Framer Motion in React',
    contentPreview: 'Framer motion makes animations declarative. Instead of managing complex CSS transitions, we use layoutId, animate, and exit props. Here is a breakdown of spring physics vs tweens...',
    author: { name: 'Runaal', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Runaal&backgroundColor=8b5cf6' },
    category: categories[1],
    tags: ['React', 'Animation', 'Frontend'],
    stats: { upvotes: 124, comments: 12 },
    timeAgo: '4 hrs ago',
    readTime: '5 min read'
  },
  {
    id: 'note_002',
    title: 'Data Structures: Trie Implementation in TypeScript',
    contentPreview: 'A Trie (prefix tree) is essential for building autocomplete systems. Let\'s look at an optimized memory-efficient implementation using TS Maps instead of Arrays for children nodes...',
    author: { name: 'Elena R.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=ec4899' },
    category: categories[0],
    tags: ['Algorithms', 'TypeScript', 'Data Structures'],
    stats: { upvotes: 389, comments: 45 },
    timeAgo: '12 hrs ago',
    readTime: '7 min read'
  },
  {
    id: 'note_003',
    title: 'Designing Accessible Design Systems',
    contentPreview: 'Accessibility (a11y) is not an afterthought. Here are my notes on ARIA attributes, focus management, color contrast ratios, and screen reader testing pipelines...',
    author: { name: 'Marcus L.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=f43f5e' },
    category: categories[2],
    tags: ['UI/UX', 'A11y', 'Design System'],
    stats: { upvotes: 256, comments: 28 },
    timeAgo: '1 day ago',
    readTime: '6 min read'
  },
  {
    id: 'note_004',
    title: 'Linear Algebra Matrices for 3D Graphics',
    contentPreview: 'Transformation matrices are the core of 3D engines. We cover Translation, Rotation, Scaling, and Projection matrices, complete with WebGL code examples...',
    author: { name: 'David M.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=David&backgroundColor=14b8a6' },
    category: categories[3],
    tags: ['Math', 'WebGL', 'Graphics'],
    stats: { upvotes: 412, comments: 33 },
    timeAgo: '2 days ago',
    readTime: '10 min read'
  },
  {
    id: 'note_005',
    title: 'Dockerizing a Next.js App for Production',
    contentPreview: 'A multi-stage Dockerfile that drops image size from 1.2GB to under 150MB. We use the standalone output feature of Next.js and Alpine Linux...',
    author: { name: 'Jordan T.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Jordan&backgroundColor=8b5cf6' },
    category: categories[4],
    tags: ['Docker', 'Next.js', 'DevOps'],
    stats: { upvotes: 567, comments: 64 },
    timeAgo: '2 days ago',
    readTime: '6 min read'
  },
  {
    id: 'note_006',
    title: 'Understanding Rust Ownership & Borrowing',
    contentPreview: 'The hardest part of learning Rust is fighting the borrow checker. These notes visually explain memory layouts, stack vs heap, lifetimes, and mutable XOR shared rules...',
    author: { name: 'Sophie C.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sophie&backgroundColor=3b82f6' },
    category: categories[0],
    tags: ['Rust', 'Systems', 'Memory'],
    stats: { upvotes: 890, comments: 112 },
    timeAgo: '3 days ago',
    readTime: '12 min read'
  }
];

export const topContributors = [
  { name: 'Sarah Drasner', handle: '@sarahed', score: 14200, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=0ea5e9' },
  { name: 'Alex Xu', handle: '@alex_system', score: 12850, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=10b981' },
  { name: 'Elena R.', handle: '@elenacodes', score: 9400, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena&backgroundColor=ec4899' },
  { name: 'Runaal', handle: '@runaal', score: 8150, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Runaal&backgroundColor=8b5cf6' },
];