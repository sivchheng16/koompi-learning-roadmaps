
import React from 'react';
import { Typography } from '../../components/ui/Typography';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../components/ui/table';
export default function Introduction() {
  return (
    <article className="max-w-3xl mx-auto font-sans space-y-10">
      <div>
        <div>
          <Typography variant="h1">Introduction: CSS Styling</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track 02: CSS Styling</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Level Overview</Typography>
          <Typography>
            CSS (Cascading Style Sheets) controls how your HTML looks. Colors, fonts, layouts, spacing — all done with CSS.
          </Typography>
          <Typography>
            Duration: 4-6 weeks
          </Typography>
          <Typography>
            Modules in this Level:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Introduction to CSS</li>
            <li>Selectors &amp; Specificity</li>
            <li>Colors, Backgrounds &amp; Typography</li>
            <li>The Box Model</li>
            <li>Layout &amp; Positioning</li>
            <li>Flexbox &amp; Responsive Design</li>
            <li>Project: Styled Portfolio</li>
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
            <li>Built your Personal Bio Page</li>
            <li>Earned HTML Fundamentals Badge</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">What You&apos;ll Build</Typography>
          <Typography>
            By the end of this level, you will transform your plain HTML bio page into a beautifully styled portfolio:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>BEFORE (HTML Only) AFTER (HTML + CSS)</li>
            <li>My Name ████████████████████████████████████</li>
            <li>• About Me →</li>
            <li>• Skills PHOTO MY NAME</li>
            <li>• Contact Software Dev</li>
            <li>Plain text... ╔ ╗</li>
            <li>║ Beautiful, styled content ║</li>
            <li>╚ ╝</li>
            <li>Plain &amp; boring</li>
            <li>Professional &amp; impressive!</li>
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
                <TableCell>Introduction to CSS</TableCell>
                <TableCell>What CSS is, how to add it</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>03</TableCell>
                <TableCell>Selectors &amp; Specificity</TableCell>
                <TableCell>Targeting elements precisely</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>04</TableCell>
                <TableCell>Colors &amp; Typography</TableCell>
                <TableCell>Visual styling fundamentals</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05</TableCell>
                <TableCell>The Box Model</TableCell>
                <TableCell>Spacing: margin, padding, border</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>06</TableCell>
                <TableCell>Layout &amp; Positioning</TableCell>
                <TableCell>Display, position, float</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>07</TableCell>
                <TableCell>Flexbox &amp; Responsive</TableCell>
                <TableCell>Modern layout, media queries</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>08</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Styled Portfolio Website</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">CSS Changes Everything</Typography>
          <CodeBlock language="css">{`/* Just a few lines of CSS... */
body {
 font-family: 'Arial', sans-serif;
 line-height: 1.6;
 color: #333;
 background-color: #f5f5f5;
}
h1 {
 color: #2c3e50;
 text-align: center;
}
/* ...transforms your entire page! */`}</CodeBlock>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track Completion</Typography>
          <Typography>
            To complete Track 02:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>All 7 modules studied</li>
            <li>All exercises completed</li>
            <li>Styled Portfolio built and working</li>
            <li>Portfolio is responsive (works on mobile)</li>
            <li>Mentor verification received</li>
            <li>CSS Styling Badge earned</li>
            <li>Web Developer Apprentice Certificate awarded!</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography>
            Time to make your websites beautiful!
          </Typography>
          <Typography>
            Start with Module 02: Introduction to CSS
          </Typography>
        </div>
      </div>
    </article>
  );
}
