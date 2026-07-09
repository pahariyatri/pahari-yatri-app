/**
 * Lean schema — only what's needed to understand the user and route them.
 * Intent → Region → Channel → Identity (name, phone, email)
 */

export type FormData = {
  intent:          string;
  preferredRegion: string;
  joinPath:        string;
  fullName:        string;
  phone:           string;
  email:           string;
};

export type Choice = {
  value:        string;
  label:        string;
  description?: string;
};

// ─── Choices ───────────────────────────────────────────────────────────────

export const INTENTS: Choice[] = [
  {
    value: 'stories',
    label: 'Himalayan stories & culture',
    description: 'Folklore, local realities, and slow documentation.',
  },
  {
    value: 'journeys',
    label: 'Mindful trails & journeys',
    description: 'Curated, small-group walks in the high Himalayas.',
  },
  {
    value: 'creator',
    label: 'Contribute or collaborate',
    description: 'As a writer, photographer, or local knowledge keeper.',
  },
  {
    value: 'curious',
    label: 'Still exploring',
    description: 'No rush — I want to understand what Pahari Yatri is.',
  },
];

export const REGIONS: Choice[] = [
  {
    value: 'himachal',
    label: 'Himachal Pradesh',
    description: 'Valleys, high passes, and devta temples.',
  },
  {
    value: 'uttarakhand',
    label: 'Uttarakhand',
    description: 'Sacred rivers, bugyals, and pilgrim routes.',
  },
  {
    value: 'kashmir-ladakh',
    label: 'Kashmir & Ladakh',
    description: 'Cold deserts, monasteries, and alpine silence.',
  },
  {
    value: 'undecided',
    label: 'Not decided yet',
    description: 'Open to wherever the season calls.',
  },
];

export const JOIN_PATHS: Choice[] = [
  {
    value: 'whatsapp',
    label: 'WhatsApp',
    description: 'Chapter drops, trail alerts, and Yatri updates.',
  },
  {
    value: 'discord',
    label: 'Discord',
    description: 'Deeper discussions, stories, and research threads.',
  },
  {
    value: 'email',
    label: 'Email',
    description: 'Occasional letters from the trails.',
  },
];

// ─── Validation ─────────────────────────────────────────────────────────────

export const validate = {
  name: (v: string): string | null => {
    if (!v || v.trim().length < 2) return 'Enter your name (at least 2 characters).';
    return null;
  },
  email: (v: string): string | null => {
    if (!v) return 'Enter your email address.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? null
      : 'Enter a valid email address.';
  },
  phone: (v: string): string | null => {
    if (!v) return 'Enter your WhatsApp number.';
    const digits = v.replace(/[\s\-().+]/g, '');
    return /^(91)?[6-9]\d{9}$/.test(digits)
      ? null
      : 'Enter a valid 10-digit Indian mobile number.';
  },
};

// ─── Turn definitions ────────────────────────────────────────────────────────

export type TurnKind = 'choice' | 'text' | 'email' | 'tel';

export type Turn = {
  field:       keyof FormData;
  kind:        TurnKind;
  question:    string;
  placeholder?: string;
  choices?:    Choice[];
  optional?:   boolean;
  validate?:   (v: string) => string | null;
};

export const TURNS: Turn[] = [
  // 1 — Intent
  {
    field:    'intent',
    kind:     'choice',
    question: 'What brings you to Pahari Yatri?',
    choices:  INTENTS,
  },
  // 2 — Region
  {
    field:    'preferredRegion',
    kind:     'choice',
    question: 'Which part of the Himalayas calls you most?',
    choices:  REGIONS,
  },
  // 3 — Channel
  {
    field:    'joinPath',
    kind:     'choice',
    question: 'Where would you like to stay connected?',
    choices:  JOIN_PATHS,
  },
  // 4 — Name
  {
    field:       'fullName',
    kind:        'text',
    question:    'What should the circle call you?',
    placeholder: 'Your full name',
    validate:    validate.name,
  },
  // 5 — WhatsApp
  {
    field:       'phone',
    kind:        'tel',
    question:    'Your WhatsApp number — this is our main way to reach you.',
    placeholder: '+91 98765 43210',
    validate:    validate.phone,
  },
  // 6 — Email
  {
    field:       'email',
    kind:        'email',
    question:    'And your email address?',
    placeholder: 'you@example.com',
    validate:    validate.email,
  },
];

// ─── Step grouping (for progress bar) ────────────────────────────────────────

export const STEP_GROUPS = [
  { label: 'Intent',   turns: [0] },
  { label: 'Region',   turns: [1] },
  { label: 'Connect',  turns: [2] },
  { label: 'Details',  turns: [3, 4, 5] },
];

export function getStepIndex(turnIndex: number): number {
  for (let i = 0; i < STEP_GROUPS.length; i++) {
    if (STEP_GROUPS[i].turns.includes(turnIndex)) return i;
  }
  return STEP_GROUPS.length - 1;
}

export function getLeadTags(data: FormData): string[] {
  const tags: string[] = [];

  if (data.intent === 'stories')   tags.push('Story Reader');
  if (data.intent === 'journeys')  tags.push('Future Yatri');
  if (data.intent === 'creator')   tags.push('Creator / Collaborator');
  if (data.intent === 'curious')   tags.push('Curious Observer');

  if (data.preferredRegion === 'himachal')       tags.push('Himachal Interest');
  if (data.preferredRegion === 'uttarakhand')    tags.push('Uttarakhand Interest');
  if (data.preferredRegion === 'kashmir-ladakh') tags.push('Kashmir / Ladakh Interest');
  if (data.preferredRegion === 'undecided')      tags.push('Region Undecided');

  if (data.joinPath === 'whatsapp') tags.push('WhatsApp Lead');
  if (data.joinPath === 'discord')  tags.push('Discord Lead');
  if (data.joinPath === 'email')    tags.push('Email Lead');

  return Array.from(new Set(tags));
}
