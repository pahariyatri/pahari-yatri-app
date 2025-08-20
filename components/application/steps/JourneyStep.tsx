'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

type Props = {
  formData: {
    energy: string;
    pastExperiences: string;
    expectations: string;
  };
  updateFormData: (field: string, value: any) => void;
};

export default function JourneyStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2">Your Journey</h2>
        <p className="text-muted-foreground">
          Tell us about your experience and what you hope to discover.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="energy">How would you describe your fitness level?</Label>
        <Select 
          value={formData.energy} 
          onValueChange={(value) => updateFormData('energy', value)}
        >
          <SelectTrigger id="energy" className="w-full">
            <SelectValue placeholder="Select your fitness level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner - I enjoy casual walks</SelectItem>
            <SelectItem value="moderate">Moderate - I exercise regularly</SelectItem>
            <SelectItem value="active">Active - I&apos;m comfortable with day hikes</SelectItem>
            <SelectItem value="experienced">Experienced - I&apos;ve done multi-day treks</SelectItem>
            <SelectItem value="advanced">Advanced - I seek challenging expeditions</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <Label htmlFor="pastExperiences">Tell us about your previous mountain journeys (if any)</Label>
        <Textarea
          id="pastExperiences"
          placeholder="Share your experiences with trekking, hiking, or mountain journeys..."
          value={formData.pastExperiences}
          onChange={(e) => updateFormData('pastExperiences', e.target.value)}
          className="min-h-[100px]"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <Label htmlFor="expectations">What do you hope to discover on this journey?</Label>
        <Textarea
          id="expectations"
          placeholder="Share what you seek to discover, experience, or transform through this journey..."
          value={formData.expectations}
          onChange={(e) => updateFormData('expectations', e.target.value)}
          className="min-h-[100px]"
        />
      </motion.div>
    </div>
  );
}