
import React from 'react';
import { Typography } from '../../components/ui/Typography';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../components/ui/table';
export default function Introduction() {
  return (
    <article className="max-w-3xl mx-auto font-sans space-y-10">
      <div>
        <div>
          <Typography variant="h1">Introduction: JavaScript Basics</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track 03: JavaScript Basics</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Level Overview</Typography>
          <Typography>
            JavaScript brings your websites to life! It makes things interactive — clicking buttons, updating content, responding to users.
          </Typography>
          <Typography>
            Duration: 6-8 weeks
          </Typography>
          <Typography>
            Modules in this Level:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Introduction to JavaScript</li>
            <li>Variables &amp; Data Types</li>
            <li>Operators &amp; Conditions</li>
            <li>Functions</li>
            <li>Arrays &amp; Loops</li>
            <li>DOM Manipulation</li>
            <li>Project: Interactive Quiz</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Prerequisites</Typography>
          <Typography>
            Before starting this level, you should have:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Completed Track 01: HTML Fundamentals</li>
            <li>Completed Track 02: CSS Styling</li>
            <li>Built your styled portfolio</li>
            <li>Earned Web Developer Apprentice Certificate</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">What You&apos;ll Build</Typography>
          <Typography>
            By the end of this level, you will create an interactive quiz application:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>CAMBODIA KNOWLEDGE QUIZ</li>
            <li>Question 3 of 10</li>
            <li>What is the capital of Cambodia?</li>
            <li>A) Siem Reap</li>
            <li>B) Phnom Penh</li>
            <li>C) Battambang</li>
            <li>Score: 2/2 correct</li>
            <li>[ NEXT QUESTION → ]</li>
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
                <TableCell>Introduction to JavaScript</TableCell>
                <TableCell>What JS is, console, first script</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>03</TableCell>
                <TableCell>Variables &amp; Data Types</TableCell>
                <TableCell>let, const, strings, numbers, booleans</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>04</TableCell>
                <TableCell>Operators &amp; Conditions</TableCell>
                <TableCell>Math, comparisons, if/else</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05</TableCell>
                <TableCell>Functions</TableCell>
                <TableCell>Creating and using functions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>06</TableCell>
                <TableCell>Arrays &amp; Loops</TableCell>
                <TableCell>Collections, for loops, array methods</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>07</TableCell>
                <TableCell>DOM Manipulation</TableCell>
                <TableCell>Selecting, changing, events</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>08</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Interactive Quiz Application</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">JavaScript Changes Everything</Typography>
          <CodeBlock language="javascript">{`// Just a few lines of JavaScript...
const button = document.querySelector('#myButton');
button.addEventListener('click', function() {
 alert('Hello, KOOMPI Apprentice!');
});
// ...makes your pages respond to users!`}</CodeBlock>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">JavaScript Uses</Typography>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>What JS Does</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Respond to clicks</TableCell>
                <TableCell>Button shows modal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Validate forms</TableCell>
                <TableCell>Check email format before submit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Update content</TableCell>
                <TableCell>Show new data without page reload</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Animate elements</TableCell>
                <TableCell>Smooth scrolling, fade effects</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fetch data</TableCell>
                <TableCell>Load content from servers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Build apps</TableCell>
                <TableCell>Interactive web applications</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track Completion</Typography>
          <Typography>
            To complete Track 03:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>All 7 modules studied</li>
            <li>All exercises completed</li>
            <li>Interactive Quiz built and working</li>
            <li>Quiz has multiple questions, scoring, and results</li>
            <li>Mentor verification received</li>
            <li>JavaScript Basics Badge earned</li>
            <li>JavaScript Developer Certificate awarded!</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography>
            Time to make your websites interactive!
          </Typography>
          <Typography>
            Start with Module 02: Introduction to JavaScript
          </Typography>
        </div>
      </div>
    </article>
  );
}
