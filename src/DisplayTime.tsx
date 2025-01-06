export function FormatTime(repInterval) {
    const seconds = repInterval % 60;
    const minutes = (repInterval - seconds) / 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
