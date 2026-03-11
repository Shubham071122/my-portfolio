"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;
    
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
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link");
      }
    }
  };

  const handleCopyCode = async (code: string) => {
		try {
			await navigator.clipboard.writeText(code)
			toast.success('Voucher code copied to clipboard!')
		} catch (error) {
			console.error('Failed to copy code:', error)
			toast.error('Failed to copy voucher code. Please try again.')
		}
	}
  
  return (
    <button 
      className="h-10 px-4 rounded-xl border border-zinc-200/50 dark:border-white/[0.08] flex items-center gap-2 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-white/[0.05] transition-all"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4" />
      <span className="sr-only md:not-sr-only">Share Article</span>
    </button>
  );
}
