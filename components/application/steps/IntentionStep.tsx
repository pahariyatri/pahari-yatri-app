'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FormData = {
  calling: string;
  season: string;
  companionship: string;
};

type Props = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
};

type Choice = { value: string; label: string; icon: string };

const CALLING: Choice[] = [
  { value: 'silence', label: 'Silence', icon: '🧘' },
  { value: 'adventure', label: 'Adventure', icon: '🏔️' },
  { value: 'spiritual', label: 'Spiritual', icon: '✨' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'culture', label: 'Culture', icon: '🏮' },
  { value: 'creative', label: 'Creative', icon: '📸' },
];

const SEASON: Choice[] = [
  { value: 'spring', label: 'Spring', icon: '🌸' },
  { value: 'summer', label: 'Summer', icon: '☀️' },
  { value: 'monsoon', label: 'Monsoon', icon: '🌧️' },
  { value: 'autumn', label: 'Autumn', icon: '🍂' },
  { value: 'winter', label: 'Winter', icon: '❄️' },
];

const COMPANIONSHIP: Choice[] = [
  { value: 'solo', label: 'Solo', icon: '🧭' },
  { value: 'friends', label: 'Friends', icon: '👥' },
  { value: 'guided-small', label: 'Small group', icon: '🧗' },
  { value: 'guided-medium', label: 'Group', icon: '👨‍👩‍👧' },
];

/**
 * Each question is a single horizontal, swipe-friendly chip row. Three short
 * rows stack compactly so the whole step fits a phone screen without vertical
 * scrolling — the visual icons double as the "guide" for each choice.
 */
export default function IntentionStep({ formData, updateFormData }: Props) {
  const Row = ({
    field,
    label,
    choices,
  }: {
    field: keyof FormData;
    label: string;
    choices: Choice[];
  }) => (
    <div className="space-y-2.5">
      <p className="text-sm font-medium text-foreground/90">{label}</p>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {choices.map((c) => {
          const selected = formData[field] === c.value;
          return (
            <motion.button
              key={c.value}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => updateFormData(field, c.value)}
              aria-pressed={selected}
              className={cn(
                'shrink-0 snap-start inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200',
                selected
                  ? 'bg-primary text-primary-foreground border-primary shadow-md ring-2 ring-primary/30 ring-offset-2 ring-offset-background'
                  : 'bg-muted/60 text-foreground/80 border-border hover:border-primary/40 hover:bg-muted'
              )}
            >
              <span aria-hidden>{c.icon}</span>
              <span className="whitespace-nowrap">{c.label}</span>
              {selected && (
                <span aria-hidden className="ml-0.5 text-primary-foreground">✓</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Row field="calling" label="What pulls you?" choices={CALLING} />
      <Row field="season" label="Your season?" choices={SEASON} />
      <Row field="companionship" label="How do you walk?" choices={COMPANIONSHIP} />
    </motion.div>
  );
}
