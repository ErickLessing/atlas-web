export type Workout = {
  id: number;
  userProfileId: number;

  date: Date; // parsed from DateOnly string
  time: Date | null; // Nullable, e.g. "17:22:00" or null

  type: string;

  totalTime: string | null; // "00:30:45" (HH:mm:ss)
  movingTime: string | null;
  elapsedTime: string | null;

  distance: number | null; // in meters
  activeCalories: number | null;
  heartRate: number | null;
  elevationGain: number | null;

  source: string;
};

export const workoutTypeColors: Record<string, string> = {
  "Functional Strength Training": "#1f2937", // Slate 800
  "Pool Swim": "#374151", // Slate 700
  Hiking: "#4b5563", // Slate 600
  Yoga: "#6b7280", // Slate 500
  Cooldown: "#9ca3af", // Slate 400
  Other: "#d1d5db", // Slate 300
};

export const workoutTypeOrder = [
  "Functional Strength Training",
  "Pool Swim",
  "Hiking",
  "Yoga",
  "Cooldown",
  "Other",
];

export const workoutTypeAliases: Record<string, string> = {
  "Functional Strength Training": "Strength",
  "Pool Swim": "Swim",
  Hiking: "Hike",
  Yoga: "Yoga",
  Cooldown: "Cool",
  Other: "Other",
};
