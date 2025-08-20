'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

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
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2">Your Calling</h2>
        <p className="text-muted-foreground">
          What draws you to the mountains? Tell us about your intentions for this journey.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="calling">What draws you to the Himalayas?</Label>
        <Select 
          value={formData.calling} 
          onValueChange={(value) => updateFormData('calling', value)}
        >
          <SelectTrigger id="calling" className="w-full">
            <SelectValue placeholder="Select what calls you" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="silence">Seeking Silence & Solitude</SelectItem>
            <SelectItem value="adventure">Adventure & Challenge</SelectItem>
            <SelectItem value="spiritual">Spiritual Connection</SelectItem>
            <SelectItem value="nature">Connection with Nature</SelectItem>
            <SelectItem value="culture">Cultural Immersion</SelectItem>
            <SelectItem value="photography">Photography & Creative Inspiration</SelectItem>
            <SelectItem value="healing">Healing & Transformation</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <Label htmlFor="season">When do you feel most called to journey?</Label>
        <Select 
          value={formData.season} 
          onValueChange={(value) => updateFormData('season', value)}
        >
          <SelectTrigger id="season" className="w-full">
            <SelectValue placeholder="Select your preferred season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spring">Spring (March-May) - Blooming Rhododendrons</SelectItem>
            <SelectItem value="summer">Summer (June-August) - Clear Mountain Views</SelectItem>
            <SelectItem value="monsoon">Monsoon (July-September) - Lush Green Landscapes</SelectItem>
            <SelectItem value="autumn">Autumn (September-November) - Golden Light</SelectItem>
            <SelectItem value="winter">Winter (December-February) - Snow-Covered Peaks</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <Label htmlFor="companionship">How do you prefer to travel?</Label>
        <Select 
          value={formData.companionship} 
          onValueChange={(value) => updateFormData('companionship', value)}
        >
          <SelectTrigger id="companionship" className="w-full">
            <SelectValue placeholder="Select your travel preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solo">Solo Journey - Finding My Path</SelectItem>
            <SelectItem value="friends">With Friends - Shared Experience</SelectItem>
            <SelectItem value="guided-small">Small Guided Group (2-6 people)</SelectItem>
            <SelectItem value="guided-medium">Medium Guided Group (7-12 people)</SelectItem>
            <SelectItem value="custom">Custom Experience</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
    </div>
  );
}