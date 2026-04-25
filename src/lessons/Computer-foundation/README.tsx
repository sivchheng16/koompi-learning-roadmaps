
import React from 'react';
import { Typography } from '../../components/ui/Typography';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../components/ui/table';

export default function Introduction() {
  return (
    <article className="max-w-3xl mx-auto font-sans space-y-10">
      <div>
        <div>
          <Typography variant="h1">Introduction: Foundation</Typography>
          <Typography variant="lead">
            Building the essential digital skills required for a career in software engineering.
          </Typography>
        </div>
      </div>

      <div>
        <div>
          <Typography variant="h2">Level Overview</Typography>
          <Typography>
            Before diving into web development, it is crucial to master the tools of the trade. This level covers the absolute basics of operating systems, typing, and professional file management.
          </Typography>
          <Typography>
            <strong>Duration:</strong> 1-2 weeks
          </Typography>
          <Typography variant="h3">Modules in this Level:</Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Linux Terminal Fundamentals</li>
            <li>File Management & Organization</li>
          </ul>
        </div>
      </div>

      <div>
        <div>
          <Typography variant="h2">Learning Objectives</Typography>
          <Typography>
            By completing this level, you will:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Feel at home in a Linux environment (specifically KOOMPI OS)</li>
            <li>Use the terminal to navigate and manipulate files efficiently</li>
            <li>Develop professional organization habits for your code and assets</li>
            <li>Achieve a typing speed of 30+ WPM to ensure productivity</li>
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
                <TableCell>Linux Terminal</TableCell>
                <TableCell>CLI, Navigation, File Operations, Shortcuts</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>03</TableCell>
                <TableCell>File Management</TableCell>
                <TableCell>Organization, Naming Conventions, Workspace Setup</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <div>
          <Typography variant="h2">Certification Requirements</Typography>
          <Typography>
            To earn the <strong>Digital Citizen</strong> certificate and move to Track 01 (HTML):
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Complete all module exercises</li>
            <li>Typing speed verified at 30+ WPM</li>
            <li>Demonstrate terminal proficiency to your mentor</li>
            <li>Show an organized project folder structure</li>
          </ul>
        </div>
      </div>

      <div>
        <div>
          <Typography variant="h3" className="text-primary italic">"The terminal is your superpower. Master it early."</Typography>
        </div>
      </div>
    </article>
  );
}
