"use client";

import { useEffect } from "react";

export default function BlogHistoryTracker({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const historyCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("read_history="));
      
      let history: string[] = [];
      if (historyCookie) {
        const value = decodeURIComponent(historyCookie.split("=")[1]);
        try {
          history = JSON.parse(value);
        } catch (e) {
          history = [];
        }
      }

      if (!Array.isArray(history)) history = [];
      if (!history.includes(slug)) {
        history.push(slug);
        const updatedHistory = history.slice(-10);
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        document.cookie = `read_history=${encodeURIComponent(
          JSON.stringify(updatedHistory)
        )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
      }
    } catch (err) {
      console.error(err);
    }
  }, [slug]);

  return null;
}
