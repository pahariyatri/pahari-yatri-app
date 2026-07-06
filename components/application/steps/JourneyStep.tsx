'use client';

import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  formData: {
    energy: number;
    pastExperiences: string;
    expectations: string;
  };
  updateFormData: (field: string, value: any) => void;
};

const LEVELS = ['Beginner', 'Moderate', 'Active', 'Experienced', 'Advanced'];

const LEVEL_NOTE: Record<number, string> = {
  1: 'Just starting out. Casual walks feel good.',
  2: 'You move often and enjoy light hikes.',
  3: 'Day treks are comfortable for you.',
  4: 'Multi-day trails? You’re ready.',
  5: 'You thrive on challenge. The mountains call you.',
};

/**
 * One compact question — fitness as a swipe-friendly chip row — plus a single
 * optional note. Fits a phone screen without scrolling.
 */
export default function JourneyStep({ formData, updateFormData }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-7"
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground/90">
          How ready are your legs?
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LEVELS.map((level, i) => {
            const selected = formData.energy === i + 1;
            return (
              <motion.button
                key={level}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => updateFormData('energy', i + 1)}
                aria-pressed={selected}
                className={cn(
                  'shrink-0 snap-start rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap',
                  selected
                    ? 'bg-primary text-primary-foreground border-primary shadow-md ring-2 ring-primary/30 ring-offset-2 ring-offset-background'
                    : 'bg-muted/60 text-foreground/80 border-border hover:border-primary/40 hover:bg-muted'
                )}
              >
                {level}
              </motion.button>
            );
          })}
        </div>
        <motion.p
          key={formData.energy}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-sm text-muted-foreground"
        >
          {LEVEL_NOTE[formData.energy]}
        </motion.p>
      </div>

      <div className="space-y-2.5">
        <p className="text-sm font-medium text-foreground/90">
          Anything you&apos;d like us to know?{' '}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </p>
        <Textarea
          id="expectations"
          placeholder="A trail you loved, what you hope to find, or nothing at all."
          value={formData.expectations}
          onChange={(e) => updateFormData('expectations', e.target.value)}
          className="min-h-[84px] rounded-2xl border-border"
        />
      </div>
    </motion.div>
  );
}
