const KEY = "koompi_progress";

export interface LessonProgress {
  lessonId: string;
  topicId: string;
  completedAt: string;
  challengePassed: boolean;
}

export interface LastViewed {
  lessonId: string;
  topicId: string;
  at: string;
}

export interface Progress {
  completed: Record<string, LessonProgress>;
  lastViewed: LastViewed | null;
}

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : { completed: {}, lastViewed: null };
  } catch {
    return { completed: {}, lastViewed: null };
  }
}

function write(p: Progress): void {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export const progressApi = {
  get(): Progress {
    return read();
  },

  markComplete(lessonId: string, topicId: string, challengePassed = false): Progress {
    const p = read();
    const existing = p.completed[lessonId];
    p.completed[lessonId] = {
      lessonId,
      topicId,
      completedAt: existing?.completedAt ?? new Date().toISOString(),
      challengePassed: existing?.challengePassed || challengePassed,
    };
    p.lastViewed = { lessonId, topicId, at: new Date().toISOString() };
    write(p);
    return p;
  },

  setLastViewed(lessonId: string, topicId: string): void {
    const p = read();
    p.lastViewed = { lessonId, topicId, at: new Date().toISOString() };
    write(p);
  },

  isComplete(lessonId: string): boolean {
    return !!read().completed[lessonId];
  },

  completedInTopic(topicId: string): number {
    const p = read();
    return Object.values(p.completed).filter(l => l.topicId === topicId).length;
  },

  recentlyCompleted(limit = 5): LessonProgress[] {
    const p = read();
    return Object.values(p.completed)
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
      .slice(0, limit);
  },
};
