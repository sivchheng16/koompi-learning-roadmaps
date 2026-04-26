import React from 'react';
import { Typography } from '../../components/ui/Typography';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../components/ui/table';
export default function Introduction() {
  return (
    <article className="max-w-3xl mx-auto font-sans space-y-10">
      <div>
        <div>
          <Typography variant="h1">Introduction: Git & GitHub</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track 05: Git &amp; GitHub</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Level Overview</Typography>
          <Typography>
            Git is version control — it tracks changes to your code. GitHub hosts your code online and enables collaboration.
          </Typography>
          <Typography>
            Duration: 1-2 weeks
          </Typography>
          <Typography>
            Modules in this Level:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Introduction to Git</li>
            <li>Basic Git Commands</li>
            <li>GitHub &amp; Remote Repositories</li>
            <li>Collaboration Workflow</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Prerequisites</Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Completed Track 01 &amp; Track 02 (HTML &amp; CSS)</li>
            <li>Comfortable with terminal commands</li>
            <li>Have a project you want to track</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Why Git Matters</Typography>
          <CodeBlock language="text">{`┌─────────────────────────────────────────────────────────────────────────────┐
│ WITHOUT GIT vs WITH GIT │
├─────────────────────────────────────────────────────────────────────────────┤
│ │
│ WITHOUT GIT: WITH GIT: │
│ │
│ project_final.html project/ │
│ project_final_v2.html ├── index.html │
│ project_final_REAL.html └── .git/ │
│ project_final_FINAL.html (all versions saved) │
│ project_DONT_DELETE.html │
│ project_backup_jan.html → One folder │
│ ... → Complete history │
│ → Easy to undo │
│ → Messy → Collaboration ready │
│ → No history → Professional │
│ → Hard to undo │
│ │
└─────────────────────────────────────────────────────────────────────────────┘`}</CodeBlock>
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
                <TableCell>Introduction to Git</TableCell>
                <TableCell>Version control, installation, setup</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>03</TableCell>
                <TableCell>Basic Commands</TableCell>
                <TableCell>Init, add, commit, log, status</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>04</TableCell>
                <TableCell>GitHub &amp; Remotes</TableCell>
                <TableCell>Push, pull, clone, SSH</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05</TableCell>
                <TableCell>Collaboration</TableCell>
                <TableCell>Branching, merging, pull requests</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">What You&apos;ll Learn</Typography>
          <Typography>
            By the end of this level, you will:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Track changes to your code</li>
            <li>Save &quot;checkpoints&quot; you can return to</li>
            <li>Put your code on GitHub</li>
            <li>Collaborate with others</li>
            <li>Contribute to open source</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Key Commands Preview</Typography>
          <CodeBlock language="bash">{`# Start tracking project
git init
# Save your work
git add .
git commit -m "Add new feature"
# Put it on GitHub
git push origin main
# Get updates from GitHub
git pull origin main`}</CodeBlock>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track Completion</Typography>
          <Typography>
            To complete Track 05:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>All 4 modules studied</li>
            <li>Have a GitHub account</li>
            <li>Your portfolio project on GitHub</li>
            <li>Understand commit history</li>
            <li>Can push and pull</li>
            <li>Git &amp; GitHub Badge earned</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography>
            Professionals use Git!
          </Typography>
          <Typography>
            Your code deserves version control.
          </Typography>
          <Typography>
            Start with Module 02: Introduction to Git
          </Typography>
        </div>
      </div>
    </article>
  );
}
