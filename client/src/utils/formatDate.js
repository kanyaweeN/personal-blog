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