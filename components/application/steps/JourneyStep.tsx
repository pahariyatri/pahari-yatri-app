'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

type Props = {
  formData: {
    energy: number;
    pastExperiences: string;
    expectations: string;
  };
  updateFormData: (field: string, value: any) => void;
};

export default function JourneyStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-4"
      >
        <h2 className="text-xl font-bold mb-1">Your Journey</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <Label htmlFor="energy">Fitness Level</Label>
            <span className="text-xs font-medium">
              {formData.energy === 1 && "Beginner"}
              {formData.energy === 2 && "Moderate"}
              {formData.energy === 3 && "Active"}
              {formData.energy === 4 && "Experienced"}
              {formData.energy === 5 && "Advanced"}
            </span>
          </div>
          
          <Slider
            id="energy"
            min={1}
            max={5}
            step={1}
            value={[formData.energy]}
            onValueChange={(value) => updateFormData('energy', value[0])}
            className="py-3"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Beginner</span>
            <span>Advanced</span>
          </div>
          
          {/* Description based on selected level */}
          <motion.div 
            className="mt-3 p-2 bg-muted/30 rounded-md text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={formData.energy}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <Label htmlFor="pastExperiences">Past Experiences</Label>
        <Textarea
          id="pastExperiences"
          placeholder="Any previous mountain experiences?"
          value={formData.pastExperiences}
          onChange={(e) => updateFormData('pastExperiences', e.target.value)}
          className="min-h-[80px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <Label htmlFor="expectations">Your Expectations</Label>
        <Textarea
          id="expectations"
          placeholder="What do you hope to experience?"
          value={formData.expectations}
          onChange={(e) => updateFormData('expectations', e.target.value)}
          className="min-h-[80px]"
        />
      </motion.div>
    </div>
  );
}