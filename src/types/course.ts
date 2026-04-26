export type BlockHeading   = { type: "heading";   level: 2 | 3; text: string };
export type BlockParagraph = { type: "paragraph"; text: string };
export type BlockCode      = { type: "code";      language: string; code: string };
export type BlockCallout   = { type: "callout";   variant: "info" | "tip" | "warning"; text: string };
export type BlockList      = { type: "list";      ordered: boolean; items: string[] };
export type BlockQuiz      = { type: "quiz";      question: string; options: string[]; answer: number };

export type Block =
  | BlockHeading
  | BlockParagraph
  | BlockCode
  | BlockCallout
  | BlockList
  | BlockQuiz;

export interface CourseModule {
  id: string;
  course_id: string;
  order: number;
  title: string;
  duration: string | null;
  blocks: Block[];
}

export interface Course {
  id: string;
  slug: string;
  user_id: string;
  title: string;
  description: string | null;
  level: "beginner" | "intermediate" | "advanced";
  is_public: boolean;
  schema_version: number;
  created_at: string;
  modules?: CourseModule[];
}

export interface OutlineModule {
  order: number;
  title: string;
  description: string;
  duration: string;
}

export interface UserCredits {
  user_id: string;
  credits_remaining: number;
  credits_used: number;
}
