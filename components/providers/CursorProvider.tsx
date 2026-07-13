"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type cursorPosition = {
  x: number;
  y: number;
};

type CursorData = {
  data: string;
  text: string;
};

type CursorContextType = {
  cursorData: { data: string; text: string };
  setCursorData: Dispatch<SetStateAction<CursorData>>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
  backgroundImageSrc: string;
  setBackgroundImageSrc: Dispatch<SetStateAction<string>>;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorData, setCursorData] = useState({ data: "", text: "" });
  const [backgroundImageSrc, setBackgroundImageSrc] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const OFFSET_X = "0.5rem";
    const OFFSET_Y = "0.5rem";

    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.translate = `calc(${event.clientX}px - 70% - ${OFFSET_X}) calc(${event.clientY}px - 70% - ${OFFSET_Y})`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorData,
        setCursorData,
        cursorRef,
        backgroundImageSrc,
        setBackgroundImageSrc,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export function useCursor(): CursorContextType {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }

  return context;
}
