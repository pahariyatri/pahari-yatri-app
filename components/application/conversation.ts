export type FormData = {
  joinType: string; // 'travel' | 'community'
  fullName: string;
  email: string;
  phone: string;
  calling: string;
  destination: string; // trail choice
  season: string;
  companionship: string;
  energy: number;
  pastExperiences: string;
  expectations: string;
};

export type Choice = { value: string; label: string; icon: string; description?: string };

export const JOIN_TYPE: Choice[] = [
  { value: "travel", label: "Join a Curated Trek", icon: "🏔️", description: "I want to go on a guided high-altitude Himalayan journey." },
  { value: "community", label: "Join the Community", icon: "🏮", description: "I want to connect with other yatris, share folklore, and contribute." }
];

export const CALLING: Choice[] = [
  { value: "silence", label: "Silence", icon: "🧘", description: "Seek quietude and find stillness in the high valleys." },
  { value: "adventure", label: "Adventure", icon: "🏔️", description: "Test your limits against rugged paths and high passes." },
  { value: "spiritual", label: "Spiritual", icon: "✨", description: "Walk ancient temple paths and sacred pilgrim trails." },
  { value: "nature", label: "Nature", icon: "🌿", description: "Wander through undisturbed pine forests and alpine meadows." },
  { value: "culture", label: "Culture", icon: "🏮", description: "Listen to local folk tales and live in slow-paced villages." },
  { value: "creative", label: "Creative", icon: "📸", description: "Capture the changing light, shadows, and mountain moods." },
];

export const DESTINATIONS: Choice[] = [
  { value: "bhaba", label: "Pin Bhaba Pass", icon: "🏔️", description: "Drama of transitioning from Kinnaur to desert Spiti." },
  { value: "buran", label: "Buran Ghati Trek", icon: "🌲", description: "Classic pass crossing with oak woods and glaciers." },
  { value: "jalori", label: "Jalori & Bashleo Pass", icon: "🌿", description: "Lush meadows, ancient trees, and sacred lakes." },
  { value: "shikari", label: "Shikari Devi & Devidarh", icon: "✨", description: "Spiritual climb to roofless mountain sanctuaries." },
  { value: "parashar", label: "Parashar Lake", icon: "🧘", description: "Pristine ridge hiking to a floating island lake." },
  { value: "undecided", label: "Help me choose", icon: "🧭", description: "I want custom suggestions based on my interests." }
];

export const SEASON: Choice[] = [
  { value: "spring", label: "Spring", icon: "🌸", description: "Rhododendrons in full bloom & thawing trails." },
  { value: "summer", label: "Summer", icon: "☀️", description: "Thriving alpine pastures and high passes open." },
  { value: "monsoon", label: "Monsoon", icon: "🌧️", description: "Misty green valleys, waterfalls & dramatic clouds." },
  { value: "autumn", label: "Autumn", icon: "🍂", description: "Stupidly clear blue skies & golden forest hues." },
  { value: "winter", label: "Winter", icon: "❄️", description: "Quiet, snow-capped peaks and cozy hearth fires." },
];

export const COMPANIONSHIP: Choice[] = [
  { value: "solo", label: "Solo", icon: "🧭", description: "Walk at your own silent, meditative pace." },
  { value: "friends", label: "Friends", icon: "👥", description: "Share the high trails with your trusted group." },
  { value: "guided-small", label: "Small group", icon: "🧗", description: "Join a handful of like-minded travelers." },
  { value: "guided-medium", label: "Group", icon: "👨‍👩‍👧", description: "Gather around a warm campfire with a group." },
];

export const LEVELS = ["Beginner", "Moderate", "Active", "Experienced", "Advanced"];

export const LEVEL_DESCRIPTIONS: Record<string, string> = {
  "1": "Comfortable with casual walks and valley wanderings.",
  "2": "Enjoy light day hikes and standard elevation gains.",
  "3": "Ready for full-day treks and moderate terrain.",
  "4": "Prepared for multi-day crossings and higher altitudes.",
  "5": "Thrive on challenging gradients and thin air.",
};

export const LEVEL_CHOICES: Choice[] = LEVELS.map((label, i) => ({
  value: String(i + 1),
  label,
  icon: "🚶",
  description: LEVEL_DESCRIPTIONS[String(i + 1)],
}));

export const LEVEL_NOTE: Record<number, string> = {
  1: "Just starting out. Casual walks feel good.",
  2: "You move often and enjoy light hikes.",
  3: "Day treks are comfortable for you.",
  4: "Multi-day trails? You're ready.",
  5: "You thrive on challenge. The mountains call you.",
};

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ") : "—");

export type TurnKind = "text" | "email" | "tel" | "choice" | "textarea";

export type Turn = {
  field: keyof FormData;
  kind: TurnKind;
  guideText: (data: FormData) => string;
  placeholder?: string;
  choices?: Choice[];
  optional?: boolean;
  formatAnswer?: (data: FormData) => string;
};

export const TURNS: Turn[] = [
  {
    field: "joinType",
    kind: "choice",
    guideText: () => "Welcome, traveler. How would you like to join the fold of Pahari Yatri?",
    choices: JOIN_TYPE,
    formatAnswer: (d) => JOIN_TYPE.find((c) => c.value === d.joinType)?.label || d.joinType,
  },
  {
    field: "calling",
    kind: "choice",
    guideText: () => "Forget the paperwork for a second. What's actually pulling you to the mountains?",
    choices: CALLING,
    formatAnswer: (d) => CALLING.find((c) => c.value === d.calling)?.label || d.calling,
  },
  {
    field: "destination",
    kind: "choice",
    guideText: () => "Which of our trails or regions are you currently drawn to?",
    choices: DESTINATIONS,
    formatAnswer: (d) => DESTINATIONS.find((c) => c.value === d.destination)?.label || d.destination,
  },
  {
    field: "season",
    kind: "choice",
    guideText: () => "Which season calls to you for this trek?",
    choices: SEASON,
    formatAnswer: (d) => SEASON.find((c) => c.value === d.season)?.label || d.season,
  },
  {
    field: "companionship",
    kind: "choice",
    guideText: () => "And how do you like to walk — solo, with friends, or with a group?",
    choices: COMPANIONSHIP,
    formatAnswer: (d) => COMPANIONSHIP.find((c) => c.value === d.companionship)?.label || d.companionship,
  },
  {
    field: "energy",
    kind: "choice",
    guideText: () => "One practical thing before we finalize — how ready are your legs for the mountain incline?",
    choices: LEVEL_CHOICES,
    formatAnswer: (d) => LEVELS[d.energy - 1] || "—",
  },
  {
    field: "expectations",
    kind: "textarea",
    guideText: (d) =>
      d.joinType === 'travel' 
        ? "Anything else you'd like us to know — a trail you loved, or what you hope to find? Totally optional."
        : "Share a bit about yourself, what you hope to find here, or stories you want to tell. Totally optional.",
    placeholder: "Share a note, or skip this one.",
    optional: true,
  },
  {
    field: "fullName",
    kind: "text",
    guideText: () => "I think I already know the shape of your path. What should we call you?",
    placeholder: "Your name",
  },
  {
    field: "email",
    kind: "email",
    guideText: (d) => `Good to meet you, ${d.fullName || "there"}. Best email to reach you at?`,
    placeholder: "you@example.com",
  },
  {
    field: "phone",
    kind: "tel",
    guideText: () => "Last one — a WhatsApp number, so we can connect on trail logistics?",
    placeholder: "+91 62808-88188",
  },
];

export function recapText(d: FormData): string {
  if (d.joinType === 'community') {
    return [
      `Here's what I've got, ${d.fullName || "friend"}:`,
      `— Joining the Community`,
      `— Drawn by: ${cap(d.calling)}`,
      d.expectations ? `— Reflections: "${d.expectations}"` : null,
      "Ready to submit this to our team?",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    `Here's what I've got, ${d.fullName || "friend"}:`,
    `— Custom Trek: ${cap(d.destination)}`,
    `— Intention: ${cap(d.calling)}`,
    `— Season: ${cap(d.season)}`,
    `— Walk Style: ${cap(d.companionship)}`,
    `— Readiness: ${LEVELS[d.energy - 1] || "—"}`,
    d.expectations ? `— Reflections: "${d.expectations}"` : null,
    "Ready to submit this to our team?",
  ]
    .filter(Boolean)
    .join("\n");
}
