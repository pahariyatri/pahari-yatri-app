'use client';

import { Label } from '@/components/ui/label';
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

export default function JourneyStep({ formData, updateFormData }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      className="space-y-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Fitness Level */}
      <motion.div className="space-y-6">
        {/* Label & Current Selection */}
        <div className="flex items-center justify-between">
          <Label htmlFor="energy" className="text-base font-semibold text-foreground">
            Fitness Level
          </Label>
          <span className="text-sm font-medium text-muted">
            {formData.energy === 1 && "Beginner"}
            {formData.energy === 2 && "Moderate"}
            {formData.energy === 3 && "Active"}
            {formData.energy === 4 && "Experienced"}
            {formData.energy === 5 && "Advanced"}
          </span>
        </div>

        {/* Segmented Buttons (2–3 per row) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Beginner", "Moderate", "Active", "Experienced", "Advanced"].map(
            (level, i) => (
              <button
                key={level}
                onClick={() => updateFormData("energy", i + 1)}
                className={cn(
                  "rounded-xl px-3 py-3 text-sm font-medium transition",
                  "border border-border shadow-sm",
                  formData.energy === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface text-muted hover:bg-accent"
                )}
              >
                {level}
              </button>
            )
          )}
        </div>

        {/* Context Text */}
        <motion.p
          key={formData.energy}
          className="text-sm text-muted leading-relaxed"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {formData.energy === 1 &&
            "Just starting out — casual walks feel good."}
          {formData.energy === 2 &&
            "You move often and enjoy light hikes."}
          {formData.energy === 3 &&
            "Day treks are comfortable for you."}
          {formData.energy === 4 &&
            "Multi-day trails? You’re ready."}
          {formData.energy === 5 &&
            "You thrive on challenge — mountains call you."}
        </motion.p>
      </motion.div>

      {/* Past Experiences */}
      <motion.div className="space-y-3">
        <Label htmlFor="pastExperiences" className="text-base font-semibold">
          Past Experiences
        </Label>
        <Textarea
          id="pastExperiences"
          placeholder="Any treks, hikes, or adventures so far?"
          value={formData.pastExperiences}
          onChange={(e) => updateFormData('pastExperiences', e.target.value)}
          className={cn(
            'min-h-[90px] rounded-2xl border transition-all',
            formData.pastExperiences
              ? 'border-black/40 dark:border-white/40'
              : 'border-neutral-300 dark:border-neutral-700'
          )}
        />
      </motion.div>

      {/* Expectations */}
      <motion.div className="space-y-3">
        <Label htmlFor="expectations" className="text-base font-semibold">
          Your Expectations
        </Label>
        <Textarea
          id="expectations"
          placeholder="What do you hope to find in the Himalayas?"
          value={formData.expectations}
          onChange={(e) => updateFormData('expectations', e.target.value)}
          className={cn(
            'min-h-[90px] rounded-2xl border transition-all',
            formData.expectations
              ? 'border-black/40 dark:border-white/40'
              : 'border-neutral-300 dark:border-neutral-700'
          )}
        />
      </motion.div>
    </motion.div>
  );
}
