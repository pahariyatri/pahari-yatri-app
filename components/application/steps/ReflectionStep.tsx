'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  
  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >

      <motion.div 
        
        className={cn(
          "space-y-6 p-8 rounded-xl",
          "bg-gradient-to-br from-background to-muted/30 border-2 border-primary/20",
          "shadow-brand-md backdrop-blur-sm"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="transition-all duration-300 hover:bg-primary/5 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-primary/80 mb-1">Name</h3>
            <p className="text-base font-medium">{formData.firstName} {formData.lastName}</p>
          </div>
          
          <div className="transition-all duration-300 hover:bg-primary/5 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-primary/80 mb-1">Your Calling</h3>
            <p className="text-base font-medium">{getReadableValue('calling', formData.calling)}</p>
          </div>
          
          <div className="transition-all duration-300 hover:bg-primary/5 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-primary/80 mb-1">Preferred Season</h3>
            <p className="text-base font-medium">{getReadableValue('season', formData.season)}</p>
          </div>
          
          <div className="transition-all duration-300 hover:bg-primary/5 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-primary/80 mb-1">Travel Preference</h3>
            <p className="text-base font-medium">{getReadableValue('companionship', formData.companionship)}</p>
          </div>
          
          <div className="transition-all duration-300 hover:bg-primary/5 p-3 rounded-lg">
            <h3 className="text-sm font-medium text-primary/80 mb-1">Fitness Level</h3>
            <p className="text-base font-medium">{getReadableValue('energy', formData.energy)}</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-primary/5 rounded-lg transition-all duration-300 hover:bg-primary/10">
          <h3 className="text-sm font-medium text-primary/80 mb-2">Your Expectations</h3>
          <p className="text-base whitespace-pre-line leading-relaxed">{formData.expectations}</p>
        </div>
      </motion.div>

      <motion.div
        
        className={cn(
          "p-8 rounded-xl",
          "bg-gradient-to-br from-primary/10 to-secondary/5",
          "border-2 border-primary/10 shadow-brand-sm"
        )}
      >
        <p className="italic text-primary/90 font-medium text-lg">
          &quot;The mountains are calling and I must go. In every walk with nature, one receives far more than they seek.&quot;
        </p>
        <p className="text-right text-sm text-primary/70 mt-3 font-brandSerif">- John Muir</p>
      </motion.div>
    </motion.div>
  );
}