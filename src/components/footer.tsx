export default function Footer() {
    return (
        <footer className="max-w-4xl mx-auto px-4 pb-28 sm:pb-32 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center text-xs text-muted-foreground mt-12">
            <div className="flex flex-col items-center gap-2">
                <p>© {new Date().getFullYear()} techshubham.cloud. All rights reserved.</p>
            </div>
        </footer>
    );
}
