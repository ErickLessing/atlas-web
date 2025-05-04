export function formatDuration(duration: string | null | undefined): string {
  if (!duration) return "-";

  const [hours, minutes, seconds] = duration.split(":").map(Number);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

export function formatDistance(distance: number | null | undefined): string {
  if (distance == null) return "-";

  return distance >= 1000
    ? `${(distance / 1000).toFixed(2)} km`
    : `${distance.toFixed(2)} m`;
}
