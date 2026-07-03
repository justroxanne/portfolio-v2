"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
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
  cursorPosition: cursorPosition;
  backgroundImageSrc: string;
  setBackgroundImageSrc: Dispatch<SetStateAction<string>>;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorData, setCursorData] = useState({ data: "", text: "" });
  const [backgroundImageSrc, setBackgroundImageSrc] = useState("");
  const [cursorPosition, setCursorPosition] = useState<cursorPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setCursorPosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <CursorContext.Provider
      value={{
        cursorData,
        setCursorData,
        cursorPosition,
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
