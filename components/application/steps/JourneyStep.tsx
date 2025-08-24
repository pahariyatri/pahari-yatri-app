'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >

      <motion.div

        className="space-y-4"
      >
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="energy">Fitness Level</Label>
            <span className="text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">
              {formData.energy === 1 && "Beginner"}
              {formData.energy === 2 && "Moderate"}
              {formData.energy === 3 && "Active"}
              {formData.energy === 4 && "Experienced"}
              {formData.energy === 5 && "Advanced"}
            </span>
          </div>

          {/* FIXED SLIDER WITH TRACK + THUMB */}
         <Slider
  id="energy"
  min={1}
  max={5}
  step={1}
  value={[formData.energy]}
  onValueChange={(value) => updateFormData('energy', value[0])}
  className="w-full py-6"
>
  <div className="relative w-full py-6">
    {/* Track as border */}
    <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 border-t-2 border-white z-0" />

    {/* Filled track */}
    <div
      className="absolute top-1/2 left-0 h-1.5 -translate-y-1/2 rounded-full bg-primary z-10 transition-all"
      style={{ width: `${(formData.energy / 5) * 100}%` }}
    />

    {/* Thumb */}
    <div
      className="absolute top-1/2 h-6 w-6 -translate-y-1/2 -ml-3 rounded-full bg-primary border border-white shadow-lg shadow-primary/20 z-20 transition-all"
      style={{ left: `${((formData.energy - 1) / 4) * 100}%` }}
    />
  </div>
</Slider>
          <div className="flex justify-between text-sm text-muted-foreground font-medium">
            <span>Beginner</span>
            <span>Advanced</span>
          </div>

          {/* Description based on selected level */}
          <motion.div
            className={cn(
              "mt-4 p-4 rounded-xl text-sm border-2 transition-all duration-300",
              "bg-gradient-to-br from-primary/5 to-secondary/10 border-primary/20 shadow-brand-sm"
            )}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            key={formData.energy}
            transition={{ duration: 0.3 }}
          >
            {formData.energy === 1 && "I enjoy casual walks and am new to hiking."}
            {formData.energy === 2 && "I exercise regularly and have some hiking experience."}
            {formData.energy === 3 && "I'm comfortable with day hikes and moderate terrain."}
            {formData.energy === 4 && "I've done multi-day treks and am prepared for challenges."}
            {formData.energy === 5 && "I seek challenging expeditions and am in excellent condition."}
          </motion.div>
        </div>
      </motion.div>

      <motion.div

        className="space-y-2"
      >
        <Label htmlFor="pastExperiences">Past Experiences</Label>
        <Textarea
          id="pastExperiences"
          placeholder="Tell us about any previous mountain experiences you've had..."
          value={formData.pastExperiences}
          onChange={(e) => updateFormData('pastExperiences', e.target.value)}
          className={cn(
            "min-h-[100px] transition-all duration-300",
            formData.pastExperiences ? "border-primary shadow-brand-sm" : ""
          )}

        />
      </motion.div>

      <motion.div

        className="space-y-2"
      >
        <Label htmlFor="expectations">Your Expectations</Label>
        <Textarea
          id="expectations"
          placeholder="What do you hope to experience on your Himalayan journey?"
          value={formData.expectations}
          onChange={(e) => updateFormData('expectations', e.target.value)}
          className={cn(
            "min-h-[100px] transition-all duration-300",
            formData.expectations ? "border-primary shadow-brand-sm" : ""
          )}

        />
      </motion.div>
    </motion.div>
  );
}
