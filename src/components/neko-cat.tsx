"use client";

import { useEffect, useRef, useState } from "react";

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

const MEOW_MESSAGES = [
  "Meow! 🐾",
  "Purrr... ❤️",
  "Looking for bugs? 🐛",
  "Let's build something cool! ⚡",
  "Hire Shubham! 🚀",
  "Zzz... 😴",
  "Feed me coffee ☕",
];

const CARD_PERCH_MESSAGES = [
  "Perched on top! 🧗",
  "Inspecting this card... 🔍",
  "10/10 project ✨",
  "Good view from up here! 🐾",
  "Border patrol 🛡️",
];

export default function NekoCat() {
  const nekoRef = useRef<HTMLDivElement | null>(null);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [bubbleKey, setBubbleKey] = useState(0);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const nekoEl = nekoRef.current;
    if (!nekoEl) return;

    let nekoPosX = 64;
    let nekoPosY = 64;
    let mousePosX = 64;
    let mousePosY = 64;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    let lastHoveredCard: HTMLElement | null = null;
    let patrolDir = 1; // 1 = right, -1 = left

    const nekoSpeed = 12;

    const setSprite = (name: string, frame: number) => {
      const sprite = SPRITE_SETS[name]?.[frame % (SPRITE_SETS[name]?.length || 1)];
      if (sprite && nekoEl) {
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
      }
    };

    const resetIdleAnimation = () => {
      idleAnimation = null;
      idleAnimationFrame = 0;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mousePosX = event.touches[0].clientX;
        mousePosY = event.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const getTargetCard = (): HTMLElement | null => {
      const el = document.elementFromPoint(mousePosX, mousePosY);
      if (!el) return null;
      const card = el.closest(".blueprint-grid, .group, [data-card], article") as HTMLElement | null;
      if (card && card !== document.body) {
        const rect = card.getBoundingClientRect();
        if (rect.width >= 160 && rect.height >= 80) {
          return card;
        }
      }
      return null;
    };

    const triggerBubble = (text: string) => {
      setBubbleText(text);
      setBubbleKey((prev) => prev + 1);
      setTimeout(() => {
        setBubbleText((cur) => (cur === text ? null : cur));
      }, 2200);
    };

    const frame = () => {
      frameCount++;

      const activeCard = getTargetCard();

      // Card climbing / perching mode
      if (activeCard) {
        const rect = activeCard.getBoundingClientRect();
        // Target is the top border ledge of the card
        const ledgeY = rect.top - 12;
        const targetX = Math.min(Math.max(rect.left + 24, mousePosX), rect.right - 24);

        if (activeCard !== lastHoveredCard) {
          lastHoveredCard = activeCard;
          if (Math.random() > 0.4) {
            triggerBubble(CARD_PERCH_MESSAGES[Math.floor(Math.random() * CARD_PERCH_MESSAGES.length)]);
          }
        }

        const diffX = nekoPosX - targetX;
        const diffY = nekoPosY - ledgeY;
        const dist = Math.sqrt(diffX ** 2 + diffY ** 2);

        // Already on the ledge -> patrol or scratch top border
        if (dist < 18) {
          idleTime++;

          // Patrol back and forth on the card border or scratch ledge
          if (idleTime > 6 && idleAnimation == null) {
            const actions = ["scratchWallS", "patrol", "scratchSelf", "idle"];
            idleAnimation = actions[Math.floor(Math.random() * actions.length)];
          }

          if (idleAnimation === "patrol") {
            nekoPosX += patrolDir * 3;
            if (nekoPosX >= rect.right - 24) {
              patrolDir = -1;
              nekoPosX = rect.right - 24;
            } else if (nekoPosX <= rect.left + 24) {
              patrolDir = 1;
              nekoPosX = rect.left + 24;
            }
            setSprite(patrolDir > 0 ? "E" : "W", Math.floor(frameCount / 3));
            idleAnimationFrame++;
            if (idleAnimationFrame > 30) resetIdleAnimation();
          } else if (idleAnimation === "scratchWallS" || idleAnimation === "scratchSelf") {
            setSprite(idleAnimation, idleAnimationFrame);
            idleAnimationFrame++;
            if (idleAnimationFrame > 12) resetIdleAnimation();
          } else {
            setSprite("idle", 0);
          }

          nekoPosY = ledgeY;
          nekoEl.style.left = `${nekoPosX - 16}px`;
          nekoEl.style.top = `${nekoPosY - 16}px`;
          return;
        }

        // Climbing up towards the ledge
        idleAnimation = null;
        idleAnimationFrame = 0;

        let direction = "";
        direction += diffY / dist > 0.5 ? "N" : "";
        direction += diffY / dist < -0.5 ? "S" : "";
        direction += diffX / dist > 0.5 ? "W" : "";
        direction += diffX / dist < -0.5 ? "E" : "";
        if (direction === "") direction = "N";

        setSprite(direction, Math.floor(frameCount / 4));

        nekoPosX -= (diffX / dist) * nekoSpeed;
        nekoPosY -= (diffY / dist) * nekoSpeed;

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        return;
      }

      // Normal free mouse chase
      lastHoveredCard = null;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idleTime++;

        if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
          const availableIdle = ["scratchSelf", "tired"];
          if (nekoPosX < 32) availableIdle.push("scratchWallW");
          if (nekoPosY < 32) availableIdle.push("scratchWallN");
          if (nekoPosX > window.innerWidth - 32) availableIdle.push("scratchWallE");
          if (nekoPosY > window.innerHeight - 32) availableIdle.push("scratchWallS");
          idleAnimation = availableIdle[Math.floor(Math.random() * availableIdle.length)];
        }

        switch (idleAnimation) {
          case "sleeping":
            if (idleAnimationFrame < 8) {
              setSprite("tired", 0);
              break;
            }
            setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
            if (idleAnimationFrame > 192) {
              resetIdleAnimation();
            }
            break;
          case "scratchWallN":
          case "scratchWallS":
          case "scratchWallE":
          case "scratchWallW":
          case "scratchSelf":
            setSprite(idleAnimation, idleAnimationFrame);
            if (idleAnimationFrame > 9) {
              resetIdleAnimation();
            }
            break;
          case "tired":
            setSprite("tired", 0);
            if (idleAnimationFrame > 8) {
              resetIdleAnimation();
              idleAnimation = "sleeping";
            }
            break;
          default:
            setSprite("idle", 0);
            return;
        }
        idleAnimationFrame++;
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime--;
        return;
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      if (direction === "") direction = "S";

      setSprite(direction, Math.floor(frameCount / 4));

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    };

    const intervalId = window.setInterval(frame, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.clearInterval(intervalId);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const randomMsg = MEOW_MESSAGES[Math.floor(Math.random() * MEOW_MESSAGES.length)];
    setBubbleText(randomMsg);
    setBubbleKey((prev) => prev + 1);

    setTimeout(() => {
      setBubbleText((cur) => (cur === randomMsg ? null : cur));
    }, 2500);
  };

  return (
    <div
      ref={nekoRef}
      id="oneko-cat"
      onClick={handleClick}
      title="Click me! 🐾"
      className="fixed z-50 cursor-pointer select-none transition-transform active:scale-125"
      style={{
        width: "32px",
        height: "32px",
        position: "fixed",
        pointerEvents: "auto",
        backgroundImage: "url(/oneko.gif)",
        imageRendering: "pixelated",
        left: "32px",
        top: "32px",
      }}
    >
      {/* Speech Bubble */}
      {bubbleText && (
        <div
          key={bubbleKey}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900/95 text-zinc-100 text-[11px] font-bold px-2.5 py-1 rounded-full border border-zinc-700 shadow-2xl pointer-events-none animate-bounce"
        >
          {bubbleText}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900/95" />
        </div>
      )}
    </div>
  );
}
