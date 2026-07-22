export function formatRelativeTime(date: string): string {
    const now = new Date().getTime();
    const then = new Date(date).getTime();

    const seconds = Math.floor((now - then) / 1000);

    if (seconds < 60) {
        return `${seconds}s ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hr ago`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) {
        return "Yesterday";
    }

    return `${days} days ago`;
}