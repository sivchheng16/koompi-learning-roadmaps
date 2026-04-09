export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  thumbnail: string;
  category: "Residential" | "Commercial" | "Retail" | "Bespoke";
  tags: string[];
  year: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  appImageUrl: string;
  thumbnail: string;
  category: string;
}

export const PROJECTS: Project[] = [
  {
    id: "elysian-residence",
    title: "Elysian Residence",
    description:
      "A calm city home built around raw concrete walls and large windows that flood every room with natural light.",
    details:
      "Located in central Phnom Penh, this three-bedroom residence uses exposed concrete and warm timber accents to create a quiet retreat from the city. The client wanted a home that felt open but private, and every room was planned to balance those two needs.",
    thumbnail: "/src/assets/elysian.png",
    category: "Residential",
    tags: ["Minimalism", "Concrete", "Urban"],
    year: "2024",
  },
  {
    id: "obsidian-lounge",
    title: "Obsidian Lounge",
    description:
      "A commercial lounge designed around dark materials and focused lighting to create an intimate, dramatic atmosphere.",
    details:
      "The client wanted a space that felt different from typical bars and lounges — quieter, more refined. We used deep charcoal stone, dark velvet seating, and a ceiling of directional pendant lights to create distinct pockets of warmth throughout the room.",
    thumbnail: "/src/assets/obsidian.png",
    category: "Commercial",
    tags: ["Atmospheric", "Luxury", "Retail"],
    year: "2023",
  },
  {
    id: "ivory-atelier",
    title: "Ivory Atelier",
    description:
      "A bright, multi-level studio space designed for a fashion label that needed room to create, meet, and display.",
    details:
      "The brief called for a flexible workspace that could shift between showroom, workshop, and meeting space without feeling cluttered. We used a mezzanine layout, clean white plaster walls, and modular rails to keep the space adaptable and easy to rearrange.",
    thumbnail: "/src/assets/ivory.png",
    category: "Commercial",
    tags: ["Bright", "Modular", "Studio"],
    year: "2023",
  },
  {
    id: "verdant-villa",
    title: "Verdant Villa",
    description:
      "A tropical villa that opens fully to the surrounding garden, using local stone and bamboo throughout.",
    details:
      "Built on a hillside outside of Siem Reap, this home was designed to stay cool naturally and feel connected to the outdoors. Local volcanic stone forms the base structure, while bamboo screens filter the light and provide privacy without closing the space off.",
    thumbnail: "/src/assets/verdant.png",
    category: "Residential",
    tags: ["Tropical", "Sustainable", "Architecture"],
    year: "2024",
  },
];

export const GAMES: Game[] = [
  {
    id: "TypingCodeGame",
    title: "Typing Code Game",
    description:
      "The classic typing code game. Type the code correctly to keep the game going!",
    iframeUrl: "https://typing-math-game.vercel.app",
    appImageUrl:
      "https://drive.google.com/file/d/1l1rA29APscP38-PhAwd84miuwOQCI2-K/view?usp=sharing",
    thumbnail: "/src/assets/game-cover/typing-code.png",
    category: "typing",
  },
  {
    id: "TypingMathGame",
    title: "Typing Math Game",
    description:
      "The classic typing math game. Thinking fast and typing the number correctly to keep the game going!",
    iframeUrl: "https://typing-math-game.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1crkVv9NvpqEmCwA10r-k2Bwr6ouEcj_-/view?usp=sharing",
    thumbnail: "/src/assets/game-cover/typing-math.png",
    category: "typing",
  },
  {
    id: "dragon-drop",
    title: "dragon-drop",
    description:
      "A fun and addictive game where you control a dragon to catch falling objects. Test your reflexes and see how long you can survive!",
    iframeUrl: "https://dragon-drop-iota.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1DHNe44e70h0XjSHZemLClLWw0A2l88uh/view?usp=sharing",
    thumbnail: "src/assets/game-cover/dragon-drop.png",
    category: "mouse",
  },
  {
    id: "RobotBrainiac",
    title: "Robot Brainiac",
    description:
      "An action-packed puzzle game where you guide a brilliant robot through challenging brain-teasing challenges. Solve puzzles, navigate obstacles, and push your strategy skills to the limit!",
    iframeUrl: "https://robot-brainiac.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1fnc-RCf242B9dC5a516VlFERCZ_HVJzi/view?usp=sharing",
    thumbnail: "src/assets/game-cover/robot-brainiac.png",
    category: "Action",
  },
  {
    id: "MasterMouse",
    title: "Master Mouse",
    description:
      "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    iframeUrl: "https://master-mouse-v1-1-0.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1lwv8tyf_UsuwLATV6OxoJW1Tewy9GLEg/view?usp=drive_link",
    thumbnail: "src/assets/game-cover/master-mouse.png",
    category: "mouse",
  },
  {
    id: "LinkNumber",
    title: "Link Number",
    description: "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    iframeUrl: "https://link-number.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/162FfIfjRK249uDLKwHkaBS-JfbwFXwZI/view?usp=sharing",
    thumbnail: "src/assets/game-cover/link-number.png",
    category: "puzzle",
  },
];

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string;
  level: string;
  lessons: Lesson[];
}

export const TOPICS: Topic[] = [
  {
    id: "html",
    title: "HTML",
    description: "The standard markup language for documents designed to be displayed in a web browser.",
    iconName: "LayoutTemplate",
    level: "Beginner",
    lessons: [
      { id: "html-1", title: "Introduction to HTML", description: "Learn the basic structure of an HTML document.", duration: "30 mins" },
      { id: "html-2", title: "HTML Elements and Tags", description: "Deep dive into paragraphs, headings, and formatting.", duration: "45 mins" },
      { id: "html-3", title: "Forms and Input", description: "Learn how to build interactive forms for users.", duration: "1 hr" }
    ]
  },
  {
    id: "css",
    title: "CSS",
    description: "Style sheet language used for describing the presentation of a document written in HTML.",
    iconName: "Paintbrush",
    level: "Beginner",
    lessons: [
      { id: "css-1", title: "CSS Fundamentals", description: "Understanding selectors, properties, and values.", duration: "45 mins" },
      { id: "css-2", title: "Flexbox & Grid", description: "Mastering modern layout techniques.", duration: "1.5 hrs" },
      { id: "css-3", title: "Animations", description: "Creating smooth transitions and keyframe animations.", duration: "1 hr" }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "High-level, often just-in-time compiled language that conforms to the ECMAScript standard.",
    iconName: "Code2",
    level: "Intermediate",
    lessons: [
      { id: "js-1", title: "Variables & Data Types", description: "Understanding let, const, strings, arrays, and objects.", duration: "1 hr" },
      { id: "js-2", title: "Functions & Scope", description: "Learn about arrow functions, closures, and lexical scope.", duration: "1.5 hrs" },
      { id: "js-3", title: "DOM Manipulation", description: "Interacting with the browser and handling events.", duration: "2 hrs" }
    ]
  },
  {
    id: "react",
    title: "React",
    description: "A free and open-source front-end JavaScript library for building user interfaces based on components.",
    iconName: "AppWindow",
    level: "Advanced",
    lessons: [
      { id: "react-1", title: "Components & Props", description: "Building reusable UI components.", duration: "1 hr" },
      { id: "react-2", title: "State & Hooks", description: "Managing state with useState and useEffect.", duration: "2 hrs" },
      { id: "react-3", title: "Routing", description: "Client-side routing with React Router.", duration: "1.5 hrs" }
    ]
  }
];
