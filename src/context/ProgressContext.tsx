import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { progressApi, Progress } from "../lib/progressApi";

interface ProgressContextType {
  progress: Progress;
  markComplete: (lessonId: string, topicId: string, challengePassed?: boolean) => void;
  setLastViewed: (lessonId: string, topicId: string) => void;
  isComplete: (lessonId: string) => boolean;
  notifyChallengePassed: (lessonId: string) => void;
  isLessonUnlocked: (lessonId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(() => progressApi.get());
  // In-memory: challenge passes during this browser session
  const sessionPassedRef = useRef<Set<string>>(new Set());
  const [, forceUpdate] = useState(0);

  const markComplete = useCallback((lessonId: string, topicId: string, challengePassed?: boolean) => {
    const passed = challengePassed ?? sessionPassedRef.current.has(lessonId);
    const next = progressApi.markComplete(lessonId, topicId, passed);
    setProgress({ ...next });
  }, []);

  const setLastViewed = useCallback((lessonId: string, topicId: string) => {
    progressApi.setLastViewed(lessonId, topicId);
    setProgress(p => ({ ...p, lastViewed: { lessonId, topicId, at: new Date().toISOString() } }));
  }, []);

  const isComplete = useCallback(
    (lessonId: string) => !!progress.completed[lessonId],
    [progress]
  );

  const notifyChallengePassed = useCallback((lessonId: string) => {
    sessionPassedRef.current.add(lessonId);
    forceUpdate(n => n + 1);
  }, []);

  const isLessonUnlocked = useCallback(
    (lessonId: string) =>
      sessionPassedRef.current.has(lessonId) ||
      !!progress.completed[lessonId]?.challengePassed,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progress, forceUpdate]
  );

  return (
    <ProgressContext.Provider value={{ progress, markComplete, setLastViewed, isComplete, notifyChallengePassed, isLessonUnlocked }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
