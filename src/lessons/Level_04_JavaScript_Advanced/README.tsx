
import React from 'react';
import { Typography } from '../../components/ui/Typography';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../components/ui/table';
export default function Introduction() {
  return (
    <article className="max-w-3xl mx-auto font-sans space-y-10">
      <div>
        <div>
          <Typography variant="h1">Introduction: JavaScript Advanced</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track 04: JavaScript Advanced</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Level Overview</Typography>
          <Typography>
            Take your JavaScript skills further! Learn advanced concepts that power real-world applications.
          </Typography>
          <Typography>
            Duration: 3-4 weeks
          </Typography>
          <Typography>
            Modules in this Level:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>ES6+ Modern Features</li>
            <li>Asynchronous JavaScript</li>
            <li>Working with APIs</li>
            <li>Error Handling &amp; Debugging</li>
            <li>Project: Weather Dashboard</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Prerequisites</Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Completed Track 03: JavaScript Basics</li>
            <li>Built Interactive Quiz project</li>
            <li>Comfortable with functions, arrays, DOM</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">What You&apos;ll Build</Typography>
          <Typography>
            A Weather Dashboard that fetches real weather data:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>WEATHER DASHBOARD</li>
            <li>Search: [Phnom Penh_____________] [ Search]</li>
            <li>Phnom Penh, Cambodia</li>
            <li>━━━━━━━━━━━━━━━━━━━━━━━━</li>
            <li>32°C</li>
            <li>Sunny</li>
            <li>Humidity: 65% Wind: 12 km/h UV: High</li>
            <li>MON TUE WED THU FRI</li>
            <li>31° 29° 27° 30° 32°</li>
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
                <TableCell>ES6+ Features</TableCell>
                <TableCell>Destructuring, spread, modules</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>03</TableCell>
                <TableCell>Async JavaScript</TableCell>
                <TableCell>Promises, async/await, callbacks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>04</TableCell>
                <TableCell>Working with APIs</TableCell>
                <TableCell>Fetch, JSON, REST APIs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05</TableCell>
                <TableCell>Error Handling</TableCell>
                <TableCell>Try/catch, debugging strategies</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>06</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Weather Dashboard</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Key Concepts</Typography>
          <Typography variant="h3">ES6+ Features</Typography>
          <CodeBlock language="javascript">{`// Destructuring
const { name, age } = user;
// Spread operator
const newArray = [...oldArray, newItem];
// Template literals
const message = \`Hello, \${name}!\`;
// Arrow functions
const add = (a, b) => a + b;`}</CodeBlock>
          <Typography variant="h3">Async/Await</Typography>
          <CodeBlock language="javascript">{`async function getWeather(city) {
 try {
 const response = await fetch(\`api/weather?city=\${city}\`);
 const data = await response.json();
 return data;
 } catch (error) {
 console.error("Failed to fetch weather:", error);
 }
}`}</CodeBlock>
          <Typography variant="h3">Fetch API</Typography>
          <CodeBlock language="javascript">{`fetch('https://api.example.com/data')
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error(error));`}</CodeBlock>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track Completion</Typography>
          <Typography>
            To complete Track 04:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>All 5 modules studied</li>
            <li>Understand async/await</li>
            <li>Can fetch data from APIs</li>
            <li>Weather Dashboard working</li>
            <li>Handle errors gracefully</li>
            <li>JavaScript Advanced Badge earned</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography>
            Real apps need real data!
          </Typography>
          <Typography>
            Start with Module 02: ES6+ Features
          </Typography>
        </div>
      </div>
    </article>
  );
}
