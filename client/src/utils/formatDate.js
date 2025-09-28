export function formatDate(isoString, locale = "en-GB") {
    if (!isoString) return "";
    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(isoString));
}