export function formatTime(repInterval: number) {
    const seconds = repInterval % 60;
    const minutes = (repInterval - seconds) / 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function formatMilliSeconds(repInterval: number) {
    const seconds = repInterval % 60000;
    const formattedSeconds = (seconds / 1000).toFixed(0);
    const minutes = (repInterval - seconds) / 60000;
    return `${minutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
}
