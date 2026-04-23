# KOOMPI OS Educational Platform

A premium, cinematic digital learning ecosystem engineered for the next generation of Khmer developers. This platform balances high-performance software education with visceral user experiences, serving as the official technical hub for the **KOOMPI Collective**.

## 🌌 The Vision
This platform is more than a curriculum; it is a technical statement for **sovereign technology**. Built to empower students within the KOOMPI OS ecosystem, it provides a high-fidelity learning path from computer foundations to professional full-stack engineering, architected by **Sivchheng Kheang** and the KOOMPI team.

## ✨ Key Features

### 📚 Interactive Curriculum
- **8-Track Deep Dive**: A comprehensive learning path covering Computer Foundations (Linux), Web Development (HTML/CSS/JS), Version Control (Git), and modern frameworks (React/Next.js).
- **Registry-Driven Content**: Lessons are managed via a dynamic registry system, allowing for seamless content updates and viewport-locked reading experiences.
- **Project-Based Learning**: Integrated milestone projects (Bio Pages, Weather Apps, Task Managers) to solidify technical concepts.

### 🎬 Cinematic Motion
- **Staggered Interface**: entrance animations for core learning modules using Framer Motion.
- **Sensory Navigation**: Integrated **Lenis Smooth Scroll** for high-end, responsive parallax effects across curricula.
- **Micro-interactions**: Adaptive hover-reactive tokens and tactile UI elements designed for an immersive educational feel.

### 📱 Adaptive Architecture
- **Static Mobile Isolation**: A hardened mobile navigation system with 100% solid background isolation and full-screen scroll locking for focused learning.
- **Fluid Layouts**: Responsive design optimized across iPhone SE, high-end tablets, and ultra-wide monitor arrays.

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS |
| **Motion** | Framer Motion, Lenis Smooth Scroll |
| **Content** | Custom Lesson Registry + JSON Course Map |
| **Icons** | Lucide React |
| **Backend** | Node.js (Express), MongoDB (via AuthGate) |

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- KOOMPI OS (Recommended) or any Linux distribution

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sivchheng16/portfolio.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the development environment:
   ```bash
   npm run dev
   ```

## 📐 Architecture Note
The project follows a **Modular Educational Architecture**:
- `src/lessons/`: Centralized content repository containing lesson modules and the `lessonRegistry.ts`.
- `src/components/`: Shared UI primitives and high-level layout blocks (e.g., `CourseTopicNavbar`).
- `src/constants.ts`: Centralized data store for curriculum metadata, team members, and interactive topics.
- `src/pages/`: Content-dense views (TopicDetails, Home) managed via `react-router-dom`.

---

*Architected in Phnom Penh // 2026 // KOOMPI Collective Studio*

