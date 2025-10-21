// แปลง Date → "11 October 2025"
export function formatDate(isoString, locale = "en-GB") {
    if (!isoString) return "";
    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(isoString));
}

// แปลง Date → "8:30 AM"
export function formatTime(isoString, locale = "en-GB") {
    if (!isoString) return ""
    return new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(new Date(isoString));
}

export function formatTimeNotification(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return date.toLocaleDateString();
}