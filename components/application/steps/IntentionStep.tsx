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
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-4"
      >
        <h2 className="text-xl font-bold mb-1">Your Intentions</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <Label className="text-base font-medium">What draws you to the Himalayas?</Label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative rounded-lg border-2 p-3 cursor-pointer transition-all duration-200',
                formData.calling === option.value 
                  ? 'border-primary bg-primary/10 shadow-md' 
                  : 'border-muted bg-background hover:border-muted-foreground/20'
              )}
              onClick={() => updateFormData('calling', option.value)}
            >
              <div className="text-xl mb-1">{option.icon}</div>
              <div className="font-medium text-sm">{option.label}</div>
              {formData.calling === option.value && (
                <motion.div 
                  className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <Label className="text-base font-medium">When do you feel called to journey?</Label>
        
        <div className="grid grid-cols-2 gap-2 pt-2">
          {[
            { value: 'spring', label: 'Spring (Mar-May)', description: 'Blooming Rhododendrons', icon: '🌸' },
            { value: 'summer', label: 'Summer (Jun-Aug)', description: 'Clear Mountain Views', icon: '☀️' },
            { value: 'monsoon', label: 'Monsoon (Jul-Sep)', description: 'Lush Green Landscapes', icon: '🌧️' },
            { value: 'autumn', label: 'Autumn (Sep-Nov)', description: 'Golden Light', icon: '🍂' },
            { value: 'winter', label: 'Winter (Dec-Feb)', description: 'Snow-Covered Peaks', icon: '❄️' },
          ].map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative rounded-lg border-2 p-3 cursor-pointer transition-all duration-200',
                formData.season === option.value 
                  ? 'border-primary bg-primary/10 shadow-md' 
                  : 'border-muted bg-background hover:border-muted-foreground/20'
              )}
              onClick={() => updateFormData('season', option.value)}
            >
              <div className="text-xl mb-1">{option.icon}</div>
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-muted-foreground">{option.description}</div>
              {formData.season === option.value && (
                <motion.div 
                  className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <Label className="text-base font-medium">How do you prefer to travel?</Label>
        
        <div className="grid grid-cols-2 gap-3 pt-2">
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
                'relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200',
                formData.companionship === option.value 
                  ? 'border-primary bg-primary/10 shadow-md' 
                  : 'border-muted bg-background hover:border-muted-foreground/20'
              )}
              onClick={() => updateFormData('companionship', option.value)}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-muted-foreground">{option.description}</div>
              {formData.companionship === option.value && (
                <motion.div 
                  className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}