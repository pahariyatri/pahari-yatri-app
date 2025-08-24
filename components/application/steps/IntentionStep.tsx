'use client';

import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  formData: {
    calling: string;
    season: string;
    companionship: string;
  };
  updateFormData: (field: string, value: any) => void;
};

export default function IntentionStep({ formData, updateFormData }: Props) {
  // Detect mobile for optimized animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1, // Faster on mobile
        delayChildren: isMobile ? 0.1 : 0.2 // Faster on mobile
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: isMobile ? 5 : 10 }, // Smaller movement on mobile
    show: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.3 : 0.4 } }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >

      <motion.div
        variants={item}
        className="space-y-4"
      >
        <Label className="font-medium flex items-center gap-1.5">
          What draws you to the Himalayas?
        </Label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
          {[
            { value: 'silence', label: 'Seeking Silence & Solitude', icon: '🧘' },
            { value: 'adventure', label: 'Adventure & Challenge', icon: '🏔️' },
            { value: 'spiritual', label: 'Spiritual Connection', icon: '✨' },
            { value: 'nature', label: 'Connection with Nature', icon: '🌿' },
            { value: 'culture', label: 'Cultural Immersion', icon: '🏮' },
            { value: 'photography', label: 'Creative Inspiration', icon: '📸' },
            { value: 'healing', label: 'Healing & Transformation', icon: '🌱' },
          ].map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'relative rounded-xl border-2 p-3 sm:p-4 cursor-pointer transition-all duration-300',
                formData.calling === option.value
                  ? 'border-primary bg-gradient-to-br from-primary/5 to-secondary/10 shadow-brand-sm'
                  : 'border-border bg-card hover:border-primary/20 hover:shadow-soft-sm'
              )}
              onClick={() => updateFormData('calling', option.value)}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium">{option.label}</div>
              {formData.calling === option.value && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground text-xs shadow-brand-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="space-y-4"
      >
        <Label className="font-medium flex items-center gap-1.5">
          When do you feel called to journey?
        </Label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
          {[
            { value: 'spring', label: 'Spring (Mar-May)', description: 'Blooming Rhododendrons', icon: '🌸' },
            { value: 'summer', label: 'Summer (Jun-Aug)', description: 'Clear Mountain Views', icon: '☀️' },
            { value: 'monsoon', label: 'Monsoon (Jul-Sep)', description: 'Lush Green Landscapes', icon: '🌧️' },
            { value: 'autumn', label: 'Autumn (Sep-Nov)', description: 'Golden Light', icon: '🍂' },
            { value: 'winter', label: 'Winter (Dec-Feb)', description: 'Snow-Covered Peaks', icon: '❄️' },
          ].map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'relative rounded-xl border-2 p-3 sm:p-4 cursor-pointer transition-all duration-300',
                formData.season === option.value
                  ? 'border-primary bg-gradient-to-br from-primary/5 to-secondary/10 shadow-brand-sm'
                  : 'border-border bg-card hover:border-primary/20 hover:shadow-soft-sm'
              )}
              onClick={() => updateFormData('season', option.value)}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-muted-foreground">{option.description}</div>
              {formData.season === option.value && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground text-xs shadow-brand-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="space-y-4"
      >
        <Label  className="font-medium flex items-center gap-1.5">
          How do you prefer to travel?
        </Label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
          {[
            { value: 'solo', label: 'Solo Journey', description: 'Finding My Path', icon: '🧭' },
            { value: 'friends', label: 'With Friends', description: 'Shared Experience', icon: '👥' },
            { value: 'guided-small', label: 'Small Guided Group', description: '2-6 people', icon: '🧗‍♀️' },
            { value: 'guided-medium', label: 'Medium Guided Group', description: '7-12 people', icon: '👨‍👩‍👧‍👦' },
          ].map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'relative rounded-xl border-2 p-3 sm:p-4 cursor-pointer transition-all duration-300',
                formData.companionship === option.value
                  ? 'border-primary bg-gradient-to-br from-primary/5 to-secondary/10 shadow-brand-sm'
                  : 'border-border bg-card hover:border-primary/20 hover:shadow-soft-sm'
              )}
              onClick={() => updateFormData('companionship', option.value)}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-muted-foreground">{option.description}</div>
              {formData.companionship === option.value && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground text-xs shadow-brand-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}