'use client';

import { motion } from 'framer-motion';

type Props = {
  formData: {
    firstName: string;
    lastName: string;
    calling: string;
    season: string;
    companionship: string;
    energy: string;
    pastExperiences: string;
    expectations: string;
  };
  updateFormData: (field: string, value: any) => void;
};

export default function ReflectionStep({ formData }: Props) {
  // Helper function to get readable values from form data
  const getReadableValue = (key: string, value: string) => {
    const mappings: Record<string, Record<string, string>> = {
      calling: {
        'silence': 'Seeking Silence & Solitude',
        'adventure': 'Adventure & Challenge',
        'spiritual': 'Spiritual Connection',
        'nature': 'Connection with Nature',
        'culture': 'Cultural Immersion',
        'photography': 'Photography & Creative Inspiration',
        'healing': 'Healing & Transformation'
      },
      season: {
        'spring': 'Spring (March-May)',
        'summer': 'Summer (June-August)',
        'monsoon': 'Monsoon (July-September)',
        'autumn': 'Autumn (September-November)',
        'winter': 'Winter (December-February)'
      },
      companionship: {
        'solo': 'Solo Journey',
        'friends': 'With Friends',
        'guided-small': 'Small Guided Group (2-6 people)',
        'guided-medium': 'Medium Guided Group (7-12 people)',
        'custom': 'Custom Experience'
      },
      energy: {
        'beginner': 'Beginner - Casual walks',
        'moderate': 'Moderate - Regular exercise',
        'active': 'Active - Comfortable with day hikes',
        'experienced': 'Experienced - Multi-day treks',
        'advanced': 'Advanced - Challenging expeditions'
      }
    };
    
    return mappings[key]?.[value] || value;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2">Your Path Ahead</h2>
        <p className="text-muted-foreground">
          Review your journey intentions before we connect you with the mountains.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 p-6 bg-muted/30 rounded-lg border border-border/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
            <p className="text-base">{formData.firstName} {formData.lastName}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Your Calling</h3>
            <p className="text-base">{getReadableValue('calling', formData.calling)}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Preferred Season</h3>
            <p className="text-base">{getReadableValue('season', formData.season)}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Travel Preference</h3>
            <p className="text-base">{getReadableValue('companionship', formData.companionship)}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Fitness Level</h3>
            <p className="text-base">{getReadableValue('energy', formData.energy)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">Your Expectations</h3>
          <p className="text-base whitespace-pre-line">{formData.expectations}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-primary/5 rounded-lg border border-primary/20"
      >
        <p className="italic text-muted-foreground">
          &quot;The mountains are calling and I must go. In every walk with nature, one receives far more than they seek.&quot;
        </p>
        <p className="text-right text-sm text-muted-foreground mt-2">- John Muir</p>
      </motion.div>
    </div>
  );
}