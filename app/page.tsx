'use client';
import React, { useState, useEffect, useRef } from 'react';
import '../style/DSARoadmap.css'; // Import your CSS styles

// Type definitions
interface Week {
  title: string;
  topics: string[];
  algorithms: string;
  practiceProblems: string;
}

interface Phase {
  id: number;
  title: string;
  duration: string;
  goal: string;
  weeks: Week[];
  resources: string;
}

interface StatCard {
  number: string;
  label: string;
}

interface TipCard {
  title: string;
  description: string;
}

const DSARoadmap: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visiblePhases, setVisiblePhases] = useState<Set<number>>(new Set());
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Phase data
  const phases: Phase[] = [
    {
      id: 1,
      title: "Foundation",
      duration: "Weeks 1-4",
      goal: "🎯 Build solid fundamentals and programming comfort",
      weeks: [
        {
          title: "Week 1-2: Programming Fundamentals",
          topics: ["Big O Notation", "Time Complexity", "Space Complexity", "Problem Solving"],
          algorithms: "Variables, loops, conditionals, functions • Understanding problem requirements • Planning and testing approach",
          practiceProblems: "Simple math operations • String manipulations • Prime numbers, GCD, LCM"
        },
        {
          title: "Week 3-4: Arrays and Strings",
          topics: ["Arrays", "Strings", "Two Pointers", "Basic Sorting"],
          algorithms: "Linear search, Binary search • Bubble sort, Selection sort, Insertion sort • String reversal, Palindrome check",
          practiceProblems: "Array rotation • Finding duplicates • Anagram detection • Two-sum problem"
        }
      ],
      resources: "Khan Academy Algorithms • Codecademy • HackerRank Easy problems"
    },
    {
      id: 2,
      title: "Core Data Structures",
      duration: "Weeks 5-10",
      goal: "🎯 Master fundamental data structures and their operations",
      weeks: [
        {
          title: "Week 5-6: Linked Lists",
          topics: ["Singly Linked Lists", "Doubly Linked Lists", "Circular Lists"],
          algorithms: "Reverse linked list • Cycle detection (Floyd's) • Merge sorted lists",
          practiceProblems: "Remove nth node from end • List intersection • Add two numbers as lists"
        },
        {
          title: "Week 7-8: Stacks and Queues",
          topics: ["Stacks (LIFO)", "Queues (FIFO)", "Priority Queues", "Circular Queues"],
          algorithms: "Balanced parentheses • Infix to postfix • Queue using stacks",
          practiceProblems: "Valid parentheses • Next greater element • Implement queue using stacks"
        },
        {
          title: "Week 9-10: Trees Introduction",
          topics: ["Binary Trees", "BST", "Tree Traversals", "Tree Properties"],
          algorithms: "Inorder, Preorder, Postorder • Level-order traversal • Height calculation",
          practiceProblems: "Maximum depth • Validate BST • Lowest common ancestor"
        }
      ],
      resources: "Cracking the Coding Interview • LeetCode Easy-Medium • GeeksforGeeks"
    },
    {
      id: 3,
      title: "Intermediate Algorithms",
      duration: "Weeks 11-16",
      goal: "🎯 Develop problem-solving skills with recursion, sorting, and hashing",
      weeks: [
        {
          title: "Week 11-12: Recursion & Backtracking",
          topics: ["Recursion", "Backtracking", "Memoization", "Dynamic Programming"],
          algorithms: "Fibonacci sequence • N-Queens problem • Sudoku solver • Permutations",
          practiceProblems: "Generate subsets • Word search • Letter combinations • Palindrome partitioning"
        },
        {
          title: "Week 13-14: Advanced Sorting & Searching",
          topics: ["Merge Sort", "Quick Sort", "Heap Sort", "Binary Search Variants"],
          algorithms: "Merge sort implementation • Quick sort pivoting • Binary search on answer space",
          practiceProblems: "Sort colors • Search rotated array • Find peak element • Kth largest element"
        },
        {
          title: "Week 15-16: Hash Tables & Maps",
          topics: ["Hash Functions", "Collision Handling", "Hash Maps", "Frequency Counting"],
          algorithms: "Two-sum with hashmap • Group anagrams • Longest substring without repeats",
          practiceProblems: "Valid anagram • Array intersection • Subarray sum equals k"
        }
      ],
      resources: "Introduction to Algorithms (CLRS) • LeetCode Medium • MIT OpenCourseWare"
    },
    {
      id: 4,
      title: "Advanced Data Structures",
      duration: "Weeks 17-24",
      goal: "🎯 Master complex data structures for advanced problem solving",
      weeks: [
        {
          title: "Week 17-18: Advanced Trees",
          topics: ["AVL Trees", "Red-Black Trees", "Segment Trees", "Trie"],
          algorithms: "Tree rotations • Range queries • Autocomplete with trie",
          practiceProblems: "Implement trie • Range sum query • Word search II"
        },
        {
          title: "Week 19-20: Heaps & Priority Queues",
          topics: ["Binary Heaps", "Min/Max Heap", "Heap Sort", "Priority Queues"],
          algorithms: "Heap construction • K-way merge • Top K elements",
          practiceProblems: "Kth largest element • Merge k sorted lists • Find median from stream"
        },
        {
          title: "Week 21-24: Graph Algorithms",
          topics: ["Graph Representation", "BFS/DFS", "Shortest Path", "MST"],
          algorithms: "Dijkstra's algorithm • Kruskal's MST • Union-Find • Topological sort",
          practiceProblems: "Number of islands • Network delay time • Course schedule • Accounts merge"
        }
      ],
      resources: "Tushar Roy YouTube • LeetCode Medium-Hard • Competitive Programming books"
    },
    {
      id: 5,
      title: "Advanced Algorithms",
      duration: "Weeks 25-32",
      goal: "🎯 Master optimization techniques and advanced algorithmic concepts",
      weeks: [
        {
          title: "Week 25-28: Dynamic Programming",
          topics: ["Classical DP", "2D DP", "Bitmask DP", "Game Theory"],
          algorithms: "Knapsack • LCS • Edit distance • TSP with bitmask • Stone game",
          practiceProblems: "Coin change • House robber • Burst balloons • Regular expression matching"
        },
        {
          title: "Week 29-32: String & Advanced Topics",
          topics: ["KMP Algorithm", "Rolling Hash", "Bit Manipulation", "Number Theory"],
          algorithms: "Pattern matching • Manacher's algorithm • Fast exponentiation • Sieve of Eratosthenes",
          practiceProblems: "Implement strStr() • Palindromic substrings • Single number • Power calculations"
        }
      ],
      resources: "Competitive Programming Handbook • LeetCode Hard • Codeforces problems"
    },
    {
      id: 6,
      title: "Mastery & Interview Prep",
      duration: "Weeks 33-40",
      goal: "🎯 Perfect your skills and prepare for technical interviews",
      weeks: [
        {
          title: "Week 33-36: Contest Programming",
          topics: ["Codeforces", "AtCoder", "Contest Strategy", "Time Management"],
          algorithms: "Multi-step problems • Optimization techniques • Fast implementation",
          practiceProblems: ""
        },
        {
          title: "Week 37-40: Interview Preparation",
          topics: ["Mock Interviews", "System Design", "Behavioral Questions", "Code Review"],
          algorithms: "Communication • Trade-off analysis • Clean code practices",
          practiceProblems: ""
        }
      ],
      resources: "Pramp/InterviewBit • Company-specific prep • Behavioral interview guides"
    }
  ];

  const stats: StatCard[] = [
    { number: "40", label: "Total Weeks" },
    { number: "6", label: "Learning Phases" },
    { number: "300+", label: "Practice Problems" },
    { number: "25+", label: "Data Structures" }
  ];

  const tips: TipCard[] = [
    {
      title: "🎯 Consistency is Key",
      description: "Practice daily, even if just 30 minutes. Regular practice builds muscle memory and problem-solving intuition."
    },
    {
      title: "🧠 Understanding > Memorization",
      description: "Focus on patterns and approaches rather than memorizing solutions. This builds transferable skills."
    },
    {
      title: "⏰ Time Management",
      description: "Use a timer during practice to simulate interview conditions and improve your speed."
    },
    {
      title: "🔄 Regular Review",
      description: "Revisit solved problems after 1-2 weeks to reinforce learning and identify knowledge gaps."
    },
    {
      title: "👥 Join Communities",
      description: "Participate in coding forums, Discord servers, and study groups for support and motivation."
    },
    {
      title: "🎨 Code Quality",
      description: "Write clean, well-commented code. Good coding practices are as important as solving the problem."
    }
  ];

  // Scroll progress tracking and phase visibility
  useEffect(() => {
    const updateProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Check which phases are visible
      const newVisiblePhases = new Set<number>();
      phaseRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const phaseVisible = 150;
          if (rect.top < window.innerHeight - phaseVisible) {
            newVisiblePhases.add(index);
          }
        }
      });
      setVisiblePhases(newVisiblePhases);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="dsa-roadmap">
      <div className="dsa-container">
        {/* Progress Tracker */}
        <div className="progress-tracker">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <div className="progress-label">Scroll Progress</div>
        </div>

        {/* Header */}
        <div className="header">
          <h1 className="header-title">DSA Mastery Roadmap</h1>
          <p className="header-subtitle">
            Your Journey from Basic to Advanced Data Structures & Algorithms
          </p>
          <div className="duration-badge">8-10 Months • 40 Weeks</div>
        </div>

        {/* Roadmap */}
        <div className="roadmap">
          <div className="roadmap-timeline"></div>
          
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              ref={(el:any) => phaseRefs.current[index] = el}
              className={`phase ${index % 2 === 0 ? 'phase-left' : 'phase-right'} ${
                visiblePhases.has(index) ? 'phase-visible' : 'phase-hidden'
              }`}
            >
              <div className={`phase-dot ${index % 2 === 0 ? 'phase-dot-left' : 'phase-dot-right'}`}></div>
              
              {/* Phase Header */}
              <div className="phase-header">
                <div className="phase-number">{phase.id}</div>
                <div className="phase-title-section">
                  <h2 className="phase-title">{phase.title}</h2>
                  <div className="phase-duration">{phase.duration}</div>
                </div>
              </div>

              {/* Phase Goal */}
              <div className="phase-goal">{phase.goal}</div>

              {/* Weeks */}
              <div className="weeks">
                {phase.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="week">
                    <h4 className="week-title">{week.title}</h4>
                    
                    <div className="week-content">
                      {/* Topics */}
                      <div className="topic-list">
                        {week.topics.map((topic, topicIndex) => (
                          <span key={topicIndex} className="topic-tag">
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Algorithms */}
                      {week.algorithms && (
                        <div className="algorithms">
                          <h5 className="algorithms-title">🔧 Key Algorithms:</h5>
                          <div className="algorithm-list">{week.algorithms}</div>
                        </div>
                      )}

                      {/* Practice Problems */}
                      {week.practiceProblems && (
                        <div className="practice-problems">
                          <h5 className="practice-problems-title">💻 Practice Problems:</h5>
                          <div className="practice-problems-list">{week.practiceProblems}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Resources */}
              <div className="phase-resources">
                <h4 className="phase-resources-title">📚 Resources:</h4>
                <div className="resource-list">{phase.resources}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <h2 className="stats-title">📊 Roadmap Statistics</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h2 className="tips-title">🚀 Success Tips</h2>
          <div className="tips-grid">
            {tips.map((tip, index) => (
              <div key={index} className="tip-card">
                <h4 className="tip-card-title">{tip.title}</h4>
                <p className="tip-card-description">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSARoadmap;