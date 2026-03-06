'use client'
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

function FluidBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const physics = React.useRef({
    tilt: 0,
    targetTilt: 0,
    velocity: 0,
    splashes: [] as any[]
  });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null) {
        // Gamma (roll) mapped to radians - Inverted to match real-world gravity
        physics.current.targetTilt = -(e.gamma * Math.PI) / 180;
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Inertia Physics
      const force = (physics.current.targetTilt - physics.current.tilt) * 0.15;
      physics.current.velocity = (physics.current.velocity + force) * 0.85;
      physics.current.tilt += physics.current.velocity;

      // Splash Trigger
      if (Math.abs(physics.current.velocity) > 0.1 && Math.random() > 0.4) {
        for (let i = 0; i < 3; i++) {
          physics.current.splashes.push({
            x: Math.random() * width,
            y: height * 0.5,
            vx: (Math.random() - 0.5) * 6,
            vy: -Math.random() * 8,
            life: 1.0
          });
        }
      }

      // Draw Wave Layers
      const drawWave = (opacity: number, amplitude: number, speed: number, freq: number) => {
        ctx.beginPath();
        // Dynamic color based on theme (subtle adjustment)
        const isDark = document.documentElement.classList.contains("dark");
        const color = isDark ? `rgba(59, 130, 246, ${opacity})` : `rgba(37, 99, 235, ${opacity * 1.5})`;
        ctx.fillStyle = color;

        const midX = width / 2;
        // Gravity Pooling: Calculate Y based on tilt to simulate volume shifting
        const volumeFactor = Math.abs(Math.sin(physics.current.tilt)) * 20;
        const midY = height * 0.7 + volumeFactor;

        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x++) {
          const relativeX = x - midX;
          const tiltY = relativeX * Math.tan(physics.current.tilt);

          // Sine Wave Slosh
          const slosh = Math.sin(x * freq + time * speed) * (amplitude + Math.abs(physics.current.velocity) * 15);

          ctx.lineTo(x, midY + tiltY + slosh);
        }

        ctx.lineTo(width, height);
        ctx.fill();
      };

      drawWave(0.1, 3, 0.4, 0.02);
      drawWave(0.15, 4, 0.6, 0.025);
      drawWave(0.2, 5, 0.8, 0.03);

      // Draw Splashes
      physics.current.splashes = physics.current.splashes.filter(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.4; // Local gravity
        s.life -= 0.03;

        ctx.beginPath();
        ctx.fillStyle = `rgba(59, 130, 246, ${s.life * 0.3})`;
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        return s.life > 0 && s.y < height + 20;
      });

      frame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={80}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-100 transition-opacity duration-1000 z-[-1] overflow-hidden rounded-[inherit]"
    />
  );
}

export default function Navbar() {
  const tooltipStyle = "bg-white text-black border-none px-2 py-1 rounded-xl shadow-2xl overflow-visible";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background/80 backdrop-blur-md [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] overflow-hidden">
        <FluidBackground />
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={10} className={tooltipStyle}>
                <span className="text-[13px] font-medium tracking-tight leading-none">{item.label}</span>
                <TooltipArrow className="fill-white" width={16} height={8} />
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={10} className={tooltipStyle}>
                  <span className="text-[13px] font-medium tracking-tight leading-none">{name}</span>
                  <TooltipArrow className="fill-white" width={16} height={8} />
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center size-12 cursor-pointer">
                <ModeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={10} className={tooltipStyle}>
              <span className="text-[13px] font-medium tracking-tight leading-none">Theme</span>
              <TooltipArrow className="fill-white" width={16} height={8} />
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
