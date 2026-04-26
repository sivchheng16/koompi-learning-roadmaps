import React from 'react';
import { Typography } from '../../components/ui/Typography';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../components/ui/table';
export default function Introduction() {
  return (
    <article className="max-w-3xl mx-auto font-sans space-y-10">
      <div>
        <div>
          <Typography variant="h1">Introduction: React</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track 06: React Fundamentals</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Level Overview</Typography>
          <Typography>
            React is a JavaScript library for building user interfaces. It&apos;s used by Facebook, Instagram, Netflix, Airbnb, and many more.
          </Typography>
          <Typography>
            Duration: 4-6 weeks
          </Typography>
          <Typography>
            Modules in this Level:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Introduction to React</li>
            <li>Components &amp; Props</li>
            <li>State &amp; Events</li>
            <li>Hooks (useState, useEffect)</li>
            <li>React Router</li>
            <li>Project: Task Manager App</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Prerequisites</Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Completed JavaScript Basics &amp; Advanced</li>
            <li>Understanding of ES6+ features</li>
            <li>Git &amp; GitHub skills</li>
            <li>Node.js installed</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Why React?</Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>WHY LEARN REACT?</li>
            <li>TRADITIONAL WEBSITE REACT APPLICATION</li>
            <li>Full page reloads Only updates what changed</li>
            <li>Hard to manage complexity Components organize code</li>
            <li>Repeat similar code Reusable components</li>
            <li>State scattered State management</li>
            <li>JOB MARKET USED BY</li>
            <li>#1 most wanted skill Facebook, Instagram</li>
            <li>High demand, good salary Netflix, Airbnb</li>
            <li>Many jobs in Cambodia Discord, Notion</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">What You&apos;ll Build</Typography>
          <Typography>
            A Task Manager Application:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>TASK MANAGER [+ Add Task]</li>
            <li>[ All ] [ Active ] [ Completed ]</li>
            <li>Learn React basics [Edit] []</li>
            <li>Due: Dec 28, 2024 Priority: High</li>
            <li>Complete JavaScript project [Edit] []</li>
            <li>Due: Dec 25, 2024 Priority: High Completed</li>
            <li>Read documentation [Edit] []</li>
            <li>Due: Dec 30, 2024 Priority: Medium</li>
            <li>Tasks: 2 active, 1 completed</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Module Index</Typography>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Key Concepts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>01</TableCell>
                <TableCell>Introduction</TableCell>
                <TableCell>Level overview, objectives, and prerequisites</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>02</TableCell>
                <TableCell>Introduction to React</TableCell>
                <TableCell>JSX, components, virtual DOM</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>03</TableCell>
                <TableCell>Components &amp; Props</TableCell>
                <TableCell>Reusable UI, passing data</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>04</TableCell>
                <TableCell>State &amp; Events</TableCell>
                <TableCell>useState, handling user input</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05</TableCell>
                <TableCell>React Hooks</TableCell>
                <TableCell>useEffect, custom hooks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>06</TableCell>
                <TableCell>React Router</TableCell>
                <TableCell>Client-side navigation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>07</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Task Manager application</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">React Code Preview</Typography>
          <Typography variant="h3">A Simple Component</Typography>
          <CodeBlock language="jsx">{`function Welcome({ name }) {
 return (
 <div className="welcome">
 <h1>Hello, {name}!</h1>
 <p>Welcome to KOOMPI</p>
 </div>
 );
}
// Usage
<Welcome name="Sokha" />`}</CodeBlock>
          <Typography variant="h3">State Management</Typography>
          <CodeBlock language="jsx">{`import { useState } from 'react';
function Counter() {
 const [count, setCount] = useState(0);
 return (
 <div>
 <p>Count: {count}</p>
 <button onClick={() => setCount(count + 1)}>
 Increment
 </button>
 </div>
 );
}`}</CodeBlock>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Setup</Typography>
          <Typography variant="h3">Create React App (with Vite)</Typography>
          <CodeBlock language="bash">{`npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev`}</CodeBlock>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track Completion</Typography>
          <Typography>
            To complete Track 06:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>All 6 modules studied</li>
            <li>Understand components and props</li>
            <li>Use React hooks (useState, useEffect)</li>
            <li>Task Manager app working</li>
            <li>Deployed to GitHub Pages or Vercel</li>
            <li>React Fundamentals Badge earned</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography>
            Build modern UIs!
          </Typography>
          <Typography>
            Start with Module 02: Introduction to React
          </Typography>
        </div>
      </div>
    </article>
  );
}
