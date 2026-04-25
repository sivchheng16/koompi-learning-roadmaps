
import React from 'react';
import { Typography } from '../../components/ui/Typography';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../components/ui/table';
export default function Introduction() {
  return (
    <article className="max-w-3xl mx-auto font-sans space-y-10">
      <div>
        <div>
          <Typography variant="h1">Introduction: HTML Fundamentals</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track 01: HTML Fundamentals</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Level Overview</Typography>
          <Typography>
            HTML (HyperText Markup Language) is the foundation of every website. In this level, you will learn to build the structure of web pages.
          </Typography>
          <Typography>
            Duration: 4-6 weeks
          </Typography>
          <Typography>
            Modules in this Level:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Getting Started with Web Development</li>
            <li>HTML Document Structure</li>
            <li>Text Content &amp; Lists</li>
            <li>Links &amp; Navigation</li>
            <li>Images &amp; Media</li>
            <li>Tables &amp; Forms</li>
            <li>Project: Personal Bio Page</li>
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
            <li>Completed Track 00: Digital Foundations</li>
            <li>Typing speed of 30+ WPM</li>
            <li>Comfort with Linux terminal</li>
            <li>Organized workspace set up</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">What You&apos;ll Build</Typography>
          <Typography>
            By the end of this level, you will create:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>YOUR PERSONAL BIO PAGE</li>
            <li>[Your Photo]</li>
            <li>Your Name</li>
            <li>Future Software Engineer</li>
            <li>About Me</li>
            <li>A paragraph about yourself and your journey...</li>
            <li>My Skills</li>
            <li>• HTML</li>
            <li>• CSS (learning)</li>
            <li>• Linux Terminal</li>
            <li>Contact</li>
            <li>email@example.com</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">How to Use This Level</Typography>
          <Typography variant="h3">For Each Module</Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Read the content carefully</li>
            <li>Type all code examples (don&apos;t copy-paste!)</li>
            <li>Experiment by changing the code</li>
            <li>Complete the exercises</li>
            <li>Build the mini-project</li>
            <li>Verify with your mentor</li>
          </ul>
          <Typography variant="h3">Folder Setup</Typography>
          <Typography>
            Create your HTML learning folder:
          </Typography>
          <CodeBlock language="bash">{`cd ~/projects/learning
mkdir -p html-fundamentals
cd html-fundamentals`}</CodeBlock>
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
                <TableCell>Getting Started</TableCell>
                <TableCell>Internet, HTML intro, first page</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>03</TableCell>
                <TableCell>Document Structure</TableCell>
                <TableCell>&lt;!DOCTYPE&gt;, &lt;html&gt;, &lt;head&gt;, &lt;body&gt;</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>04</TableCell>
                <TableCell>Text Content &amp; Lists</TableCell>
                <TableCell>Headings, paragraphs, lists</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05</TableCell>
                <TableCell>Links &amp; Navigation</TableCell>
                <TableCell>&lt;a&gt; tags, URLs, anchors</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>06</TableCell>
                <TableCell>Images &amp; Media</TableCell>
                <TableCell>&lt;img&gt;, paths, file formats</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>07</TableCell>
                <TableCell>Tables &amp; Forms</TableCell>
                <TableCell>Data tables, user input</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>08</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Personal bio page</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track Completion</Typography>
          <Typography>
            To complete Track 01:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>All 7 modules studied</li>
            <li>All exercises completed</li>
            <li>Personal Bio Page built and working</li>
            <li>Mentor verification received</li>
            <li>HTML Fundamentals Badge earned</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography>
            Let&apos;s build your first website!
          </Typography>
          <Typography>
            Start with Module 02: Getting Started
          </Typography>
        </div>
      </div>
    </article>
  );
}
