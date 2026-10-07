"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Article link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link");
      }
    }
  };
  
  return (
    <button 
      type="button"
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-all shadow-sm active:scale-95"
      onClick={handleShare}
    >
      <Share2 className="h-3.5 w-3.5 text-zinc-400" />
      <span>Share Article</span>
    </button>
  );
}
