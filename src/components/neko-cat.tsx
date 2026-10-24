"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNeko } from "@/lib/neko-store";

const SPRITE_SETS: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

interface PawPrint {
  id: number;
  x: number;
  y: number;
  angle: number;
}

interface CursorMouseState {
  x: number;
  y: number;
  angle: number;
  isMoving: boolean;
  isCaught: boolean;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  type: "diamond" | "cross" | "star";
  color: string;
}

export default function NekoCat() {
  const nekoRef = useRef<HTMLDivElement | null>(null);
  const { isPlaying, toggle: togglePlay, setPlaying } = useNeko();
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isHoveredHouse, setIsHoveredHouse] = useState(false);
  const [cursorMouse, setCursorMouse] = useState<CursorMouseState>({
    x: -100,
    y: -100,
    angle: 0,
    isMoving: false,
    isCaught: false,
  });

  const isPlayingRef = useRef(false);
  const isHoveredHouseRef = useRef(false);
  const isCaughtRef = useRef(false);
  const wasCaughtRef = useRef(false);
  const caughtFramesRef = useRef(0);

  const spawnSparkles = (x: number, y: number) => {
    const types: ("diamond" | "cross" | "star")[] = ["diamond", "cross", "diamond", "star", "diamond"];
    const colors = ["#fde047", "#facc15", "#ffffff", "#fef08a", "#fbbf24"];
    const newSparkles: Sparkle[] = types.map((type, i) => {
      const angle = (i * (360 / types.length) + (Math.random() * 24 - 12)) * (Math.PI / 180);
      const dist = 18 + Math.random() * 16;
      return {
        id: Date.now() + Math.random() + i,
        x,
        y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        size: i % 2 === 0 ? 12 : 8,
        type,
        color: colors[i % colors.length],
      };
    });

    setSparkles((prev) => [...prev.slice(-10), ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.some((ns) => ns.id === s.id)));
    }, 600);
  };

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    // Toggle cursor class on body when mouse chase is active
    if (isPlaying) {
      document.body.classList.add("neko-mouse-cursor-active");
    } else {
      document.body.classList.remove("neko-mouse-cursor-active");
    }
    return () => {
      document.body.classList.remove("neko-mouse-cursor-active");
    };
  }, [isPlaying]);

  useEffect(() => {
    isHoveredHouseRef.current = isHoveredHouse;
  }, [isHoveredHouse]);

  // Handle Escape key to safely exit chase mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPlayingRef.current) {
        setPlaying(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setPlaying]);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const nekoEl = nekoRef.current;
    if (!nekoEl) return;

    // Home position: Nestled right inside the cozy arched doorway of the cat house
    // Cat house is at bottom-4 left-4 (left: 16px, bottom: 16px, width: 60px)
    // House door center: x = 16 + 30 = 46px.
    // Door base: y = window.innerHeight - 16 - 15px = window.innerHeight - 31px.
    const getHomePos = () => ({
      x: 44,
      y: window.innerHeight - 30,
    });

    let home = getHomePos();
    let nekoPosX = home.x;
    let nekoPosY = home.y;
    let mousePosX = home.x;
    let mousePosY = home.y;
    let lastCursorX = home.x;
    let lastCursorY = home.y;
    let mouseAngle = 0;
    let lastMoveTime = 0;
    let lastDirection = "S";

    // Immediately position cat inside house doorway
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    let frameCount = 0;
    let pawStep = 0;

    const nekoSpeed = 13;

    const setSprite = (name: string, frame: number) => {
      const sprite = SPRITE_SETS[name]?.[frame % (SPRITE_SETS[name]?.length || 1)];
      if (sprite && nekoEl) {
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const curX = event.clientX;
      const curY = event.clientY;
      const dx = curX - lastCursorX;
      const dy = curY - lastCursorY;
      const dist = Math.sqrt(dx ** 2 + dy ** 2);

      if (dist > 3) {
        mouseAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        lastCursorX = curX;
        lastCursorY = curY;
        lastMoveTime = Date.now();
      }

      // If user moves mouse away from cat while caught, escape immediately!
      const distFromCat = Math.sqrt((curX - nekoPosX) ** 2 + (curY - nekoPosY) ** 2);
      if (distFromCat > 22 && isCaughtRef.current) {
        isCaughtRef.current = false;
        wasCaughtRef.current = false;
        caughtFramesRef.current = 0;
      }

      mousePosX = curX;
      mousePosY = curY;

      if (isPlayingRef.current) {
        setCursorMouse({
          x: curX,
          y: curY,
          angle: mouseAngle,
          isMoving: Date.now() - lastMoveTime < 150,
          isCaught: isCaughtRef.current,
        });
      }
    };

    const handleResize = () => {
      home = getHomePos();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    const dropPawPrint = (x: number, y: number, dirX: number, dirY: number) => {
      pawStep++;
      const isLeft = pawStep % 2 === 0;
      const moveAngle = Math.atan2(dirY, dirX); // Direction of travel
      // Stagger paws alternating slightly left/right of stride
      const perpAngle = moveAngle + (isLeft ? Math.PI / 2 : -Math.PI / 2);
      const pawX = x + Math.cos(perpAngle) * 5;
      const pawY = y + Math.sin(perpAngle) * 5;
      // Default SVG toes point North (-90 deg), add 90 deg to align with moveAngle
      const deg = (moveAngle * 180) / Math.PI + 90;

      const newPaw: PawPrint = {
        id: Date.now() + Math.random(),
        x: pawX,
        y: pawY,
        angle: deg,
      };

      setPawPrints((prev) => [...prev.slice(-40), newPaw]);

      setTimeout(() => {
        setPawPrints((prev) => prev.filter((p) => p.id !== newPaw.id));
      }, 2500);
    };

    const frame = () => {
      frameCount++;

      // When cat is resting inside or returning to house
      if (!isPlayingRef.current) {
        if (wasCaughtRef.current) {
          wasCaughtRef.current = false;
          isCaughtRef.current = false;
          caughtFramesRef.current = 0;
          setCursorMouse((prev) => ({ ...prev, isCaught: false }));
        }

        const diffHomeX = nekoPosX - home.x;
        const diffHomeY = nekoPosY - home.y;
        const distHome = Math.sqrt(diffHomeX ** 2 + diffHomeY ** 2);

        // Walking back into the house doorway
        if (distHome > 8) {
          let direction = "";
          direction += diffHomeY / distHome > 0.5 ? "N" : "";
          direction += diffHomeY / distHome < -0.5 ? "S" : "";
          direction += diffHomeX / distHome > 0.5 ? "W" : "";
          direction += diffHomeX / distHome < -0.5 ? "E" : "";
          if (direction === "") direction = "SW";

          setSprite(direction, Math.floor(frameCount / 4));
          const stepX = -(diffHomeX / distHome) * (nekoSpeed * 0.9);
          const stepY = -(diffHomeY / distHome) * (nekoSpeed * 0.9);
          nekoPosX += stepX;
          nekoPosY += stepY;

          // Drop dynamic paw prints along stride when returning home too!
          if (frameCount % 2 === 0) {
            dropPawPrint(nekoPosX, nekoPosY, stepX, stepY);
          }

          nekoEl.style.left = `${nekoPosX - 16}px`;
          nekoEl.style.top = `${nekoPosY - 16}px`;
          return;
        }

        // Inside the house doorway!
        nekoPosX = home.x;
        nekoPosY = home.y;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;

        // If user is hovering over the house, peek out alertly; otherwise sleep peacefully
        if (isHoveredHouseRef.current) {
          setSprite("alert", 0);
        } else {
          setSprite("sleeping", Math.floor(frameCount / 6));
        }
        return;
      }

      // Playing mode: Cat runs outside and chases the mouse cursor!
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // CATCH EVENT: Cat intercepts & pounces directly on the mouse!
      if (distance <= 18) {
        if (!wasCaughtRef.current) {
          wasCaughtRef.current = true;
          isCaughtRef.current = true;
          spawnSparkles(mousePosX, mousePosY);
          setCursorMouse((prev) => ({ ...prev, isCaught: true }));
        }

        caughtFramesRef.current++;

        // Snap paws directly over the mouse
        nekoPosX = mousePosX;
        nekoPosY = mousePosY - 6;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;

        // Determine swatting sprite based on approach direction
        const swatSprite = lastDirection.includes("N")
          ? "scratchWallN"
          : lastDirection.includes("E")
          ? "scratchWallE"
          : lastDirection.includes("W")
          ? "scratchWallW"
          : "scratchWallS";

        // Playful batting with paws!
        if (caughtFramesRef.current < 25) {
          setSprite(swatSprite, Math.floor(frameCount / 2));
        } else if (caughtFramesRef.current < 45) {
          setSprite("alert", 0);
        } else {
          setSprite(swatSprite, Math.floor(frameCount / 3));
          if (caughtFramesRef.current > 70) {
            caughtFramesRef.current = 0;
          }
        }
        return;
      }

      // Mouse is free and running away!
      if (wasCaughtRef.current) {
        wasCaughtRef.current = false;
        isCaughtRef.current = false;
        caughtFramesRef.current = 0;
        setCursorMouse((prev) => ({ ...prev, isCaught: false }));
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      if (direction === "") direction = "S";
      lastDirection = direction;

      setSprite(direction, Math.floor(frameCount / 4));

      const moveStepX = -(diffX / distance) * nekoSpeed;
      const moveStepY = -(diffY / distance) * nekoSpeed;
      nekoPosX += moveStepX;
      nekoPosY += moveStepY;

      // Drop dynamic paw prints along stride
      if (frameCount % 2 === 0) {
        dropPawPrint(nekoPosX, nekoPosY, moveStepX, moveStepY);
      }

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    };

    const intervalId = window.setInterval(frame, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {/* Dynamic Glowing Paw Print Trail */}
      {pawPrints.map((paw) => (
        <div
          key={paw.id}
          className="pointer-events-none fixed z-40 text-amber-500/60 dark:text-amber-300/65"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            animation: "pawFadeOut 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
          }}
        >
          {/* Inner element handles rotation dynamically without CSS keyframe overriding it */}
          <div
            style={{
              transform: `translate(-50%, -50%) rotate(${paw.angle}deg)`,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="drop-shadow-[0_0_3px_rgba(245,158,11,0.25)] dark:drop-shadow-[0_0_4px_rgba(251,191,36,0.35)]"
            >
              {/* Main plantar pad */}
              <ellipse cx="12" cy="15" rx="5" ry="4" />
              {/* 4 distinct toe beans pointing North (-Y) */}
              <circle cx="6" cy="9" r="2.2" />
              <circle cx="10" cy="5.8" r="2.2" />
              <circle cx="14" cy="5.8" r="2.2" />
              <circle cx="18" cy="9" r="2.2" />
            </svg>
          </div>
        </div>
      ))}


      {/* Crisp Diamond Sparkles on Catch */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="pointer-events-none fixed z-[9998] select-none will-change-transform"
          style={
            {
              left: `${sparkle.x}px`,
              top: `${sparkle.y}px`,
              "--dx": `${sparkle.dx}px`,
              "--dy": `${sparkle.dy}px`,
              animation: "sparkleBurst 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            } as React.CSSProperties
          }
        >
          {sparkle.type === "cross" ? (
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 24 24"
              fill={sparkle.color}
              className="drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"
            >
              <polygon points="12,1 15,9 23,12 15,15 12,23 9,15 1,12 9,9" />
            </svg>
          ) : sparkle.type === "star" ? (
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 24 24"
              fill={sparkle.color}
              className="drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"
            >
              <path d="M12 0 L14 8 L22 10 L15 14 L17 22 L12 16 L7 22 L9 14 L2 10 L10 8 Z" />
            </svg>
          ) : (
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 24 24"
              fill={sparkle.color}
              className="drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"
            >
              <path d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z" />
            </svg>
          )}
        </div>
      ))}

      {/* Scurrying Pixel Mouse (The cursor itself becomes the mouse!) */}
      {isPlaying && cursorMouse.x > 0 && (
        <div
          className="pointer-events-none fixed z-[9999] select-none will-change-transform"
          style={{
            left: `${cursorMouse.x}px`,
            top: `${cursorMouse.y}px`,
            transform: `translate(-50%, -50%) rotate(${cursorMouse.angle}deg)`,
          }}
        >
          <div
            className={cn(
              "relative flex items-center justify-center transition-transform",
              cursorMouse.isMoving && !cursorMouse.isCaught && "animate-[mouseScamper_0.12s_infinite_alternate]",
              cursorMouse.isCaught && "animate-[mouseStruggle_0.08s_infinite_alternate]"
            )}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] filter"
            >
              {/* Tail trailing behind (facing West / -X) */}
              <path
                d="M3 13c-2 2-2 4 1 5"
                stroke="#94a3b8"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="origin-left animate-[tailWiggle_0.2s_ease-in-out_infinite_alternate]"
              />
              {/* Mouse Body */}
              <path
                d="M4 12c0-3.5 3-6 8-6 5.5 0 9 4.5 10 6-1 1.5-4.5 6-10 6-5 0-8-2.5-8-6z"
                className="fill-slate-600 dark:fill-slate-200 stroke-slate-800 dark:stroke-slate-900"
                strokeWidth="1"
              />
              {/* Underbelly Shade */}
              <path
                d="M6 13c1 2.5 3.5 4 6 4 3 0 5-1.5 6-3-2 1-4 1.5-6 1.5s-4-.5-6-2.5z"
                className="fill-slate-700 dark:fill-slate-400"
              />
              {/* Pink Nose Tip (Cursor Hotspot) */}
              <circle cx="21" cy="12" r="1.5" fill="#f43f5e" />
              {/* Whiskers */}
              <line x1="19" y1="9.5" x2="23" y2="7.5" stroke="#cbd5e1" strokeWidth="0.9" />
              <line x1="19" y1="14.5" x2="23" y2="16.5" stroke="#cbd5e1" strokeWidth="0.9" />
              {/* Ears with Pink Inner */}
              <circle cx="9" cy="6.5" r="3.2" className="fill-slate-600 dark:fill-slate-200 stroke-slate-800 dark:stroke-slate-900" strokeWidth="0.8" />
              <circle cx="9" cy="6.5" r="1.7" fill="#fda4af" />
              <circle cx="9" cy="17.5" r="3.2" className="fill-slate-600 dark:fill-slate-200 stroke-slate-800 dark:stroke-slate-900" strokeWidth="0.8" />
              <circle cx="9" cy="17.5" r="1.7" fill="#fda4af" />
              {/* Eye / Face Reaction */}
              {cursorMouse.isCaught ? (
                /* Comical > < squinting panic eyes */
                <path
                  d="M14.5 8l2.5 1.5-2.5 1.5"
                  stroke="#0f172a"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-slate-900"
                />
              ) : (
                <>
                  <circle cx="16" cy="9.5" r="1.3" fill="#0f172a" />
                  <circle cx="16.4" cy="9.2" r="0.4" fill="#ffffff" />
                </>
              )}
            </svg>
          </div>
        </div>
      )}

      {/* The Cozy Cat House (Bottom Left) */}
      <div
        id="neko-house"
        onClick={togglePlay}
        onMouseEnter={() => setIsHoveredHouse(true)}
        onMouseLeave={() => setIsHoveredHouse(false)}
        className="fixed bottom-4 left-4 z-30 cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 group"
        title={isPlaying ? "Click house to call Milo home 🏠" : "Milo's House · Click to play! 🐾"}
      >
        <div className="relative">
          {/* House SVG */}
          <svg width="60" height="56" viewBox="0 0 60 56" fill="none" className="drop-shadow-lg filter">
            {/* Chimney */}
            <rect x="42" y="7" width="7" height="12" rx="1.5" className="fill-amber-800 dark:fill-stone-600" />
            {/* Smoke puff when kitten is warm inside */}
            {!isPlaying && (
              <circle cx="45.5" cy="4" r="2.2" className="fill-slate-400/50 dark:fill-stone-400/40 animate-pulse" />
            )}
            {/* Roof (cozy pitched roof) */}
            <path
              d="M30 4 L57 22 H3 Z"
              className="fill-amber-600 dark:fill-amber-700 stroke-amber-700 dark:stroke-amber-800"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Roof highlight */}
            <path d="M30 6 L54 21" stroke="#fcd34d" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            {/* Tiny cat ears accent on roof crest */}
            <polygon points="27,4 30,1 33,4" className="fill-amber-500 dark:fill-amber-600" />
            {/* House Body */}
            <rect
              x="8"
              y="21"
              width="44"
              height="33"
              rx="3"
              className="fill-amber-100 dark:fill-stone-800 stroke-amber-200 dark:stroke-stone-700"
              strokeWidth="1.5"
            />
            {/* Horizontal wood plank details */}
            <line x1="8" y1="31" x2="52" y2="31" className="stroke-amber-200/80 dark:stroke-stone-700/80" strokeWidth="1" />
            <line x1="8" y1="41" x2="52" y2="41" className="stroke-amber-200/80 dark:stroke-stone-700/80" strokeWidth="1" />
            {/* Tiny fish plaque above doorway */}
            <ellipse cx="30" cy="26" rx="3.5" ry="2" className="fill-amber-400 dark:fill-amber-500" />
            <polygon points="34,26 37,24 37,28" className="fill-amber-400 dark:fill-amber-500" />
            {/* Arched Doorway (where kitten curls up) */}
            <path
              d="M19 54 V37 A11 11 0 0 1 41 37 V54 Z"
              className="fill-slate-900 dark:fill-black"
            />
            {/* Welcome mat */}
            <ellipse cx="30" cy="52" rx="9" ry="2" className="fill-red-400/80 dark:fill-red-500/70" />
          </svg>

          {/* Minimal, elegant hover tooltip */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap px-2 py-0.5 rounded-md bg-background/95 dark:bg-stone-900/95 text-[10px] font-medium border border-border/60 shadow-sm text-foreground">
            {isPlaying ? "Call Milo home 🏠" : "Click house to play! 🐾"}
          </div>
        </div>
      </div>

      {/* Pixel Cat Sprite (Lives inside the doorway when resting, chases mouse when active) */}
      <div
        ref={nekoRef}
        id="oneko-cat"
        onClick={togglePlay}
        title={isPlaying ? "Click Milo to rest" : "Click Milo to play!"}
        className="fixed z-50 select-none cursor-pointer transition-transform active:scale-125 hover:brightness-110"
        style={{
          width: "32px",
          height: "32px",
          position: "fixed",
          pointerEvents: "auto",
          backgroundImage: "url(/oneko.gif)",
          imageRendering: "pixelated",
          left: "30px",
          top: "30px",
        }}
      />

      <style jsx global>{`
        /* When mouse chase is active, hide default OS cursor so user controls the scurrying mouse */
        body.neko-mouse-cursor-active,
        body.neko-mouse-cursor-active * {
          cursor: none !important;
        }

        @keyframes pawFadeOut {
          0% {
            opacity: 0.85;
          }
          40% {
            opacity: 0.75;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes mouseScamper {
          0% {
            transform: translateY(-1px) scaleY(0.95);
          }
          100% {
            transform: translateY(1px) scaleY(1.05);
          }
        }
        @keyframes mouseStruggle {
          0% {
            transform: rotate(-10deg) scale(0.95);
          }
          100% {
            transform: rotate(10deg) scale(1.05);
          }
        }
        @keyframes tailWiggle {
          0% {
            transform: rotate(-12deg);
          }
          100% {
            transform: rotate(15deg);
          }
        }
        @keyframes sparkleBurst {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(0, 0) scale(0.2) rotate(0deg);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(calc(var(--dx) * 0.7), calc(var(--dy) * 0.7)) scale(1.2) rotate(45deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(0.2) rotate(90deg);
          }
        }
      `}</style>
    </>
  );
}
