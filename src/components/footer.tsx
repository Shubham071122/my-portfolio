export default function Footer() {
    return (
        <footer className="pb-16 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center text-sm text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
                <p>© {new Date().getFullYear()} techshubham.cloud. All rights reserved.</p>
            </div>
        </footer>
    );
}
