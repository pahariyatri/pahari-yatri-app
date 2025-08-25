'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
 // Reuse the type from ApplicationForm

 type FormData = {
  fullName: string;
  email: string;
  phone: string;
  calling: string;
  season: string;
  companionship: string;
  energy: number; // Changed to number for slider
  pastExperiences: string;
  expectations: string;
};

type Props = {
  formData: FormData  ;
  onSubmit: () => void;
};

export default function FinalStep({ formData, onSubmit }: Props) {
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
      {/* Heading */}
      <motion.div
        variants={item}
        className="text-center mb-6"
      >
        <h2 className="text-h2 font-brandSerif font-semibold mb-2 text-primary">Review Your Journey</h2>
        <p className="text-muted-foreground">Confirm your details before we begin</p>
      </motion.div>

      {/* Personal Info */}
      <motion.div 
        variants={item}
        className={cn(
          "space-y-4 p-6 rounded-xl border-2 transition-all duration-300",
          "bg-gradient-to-br from-background to-muted/30 border-primary/20 shadow-brand-sm"
        )}
      >
        <h3 className="text-base font-semibold text-primary/90 font-brandSerif border-b border-primary/10 pb-2 mb-2">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground">Full Name</h4>
            <p className="text-base font-medium">{formData.fullName}</p>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
              <p className="text-base">{formData.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
              <p className="text-base">{formData.phone}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Journey Details */}
      <motion.div
        variants={item}
        className="space-y-4"
      >
        <div className={cn(
          "p-6 rounded-xl border-2 transition-all duration-300",
          "bg-gradient-to-br from-primary/5 to-secondary/10 border-primary/20 shadow-brand-sm"
        )}>
          <h3 className="text-base font-semibold text-primary/90 font-brandSerif border-b border-primary/10 pb-2 mb-4">
            Journey Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Intention</h4>
              <p className="text-base font-medium">{formData.calling}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Season</h4>
              <p className="text-base font-medium">{formData.season}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Fitness Level</h4>
              <p className="text-base font-medium">
                {formData.energy === 1 && "Beginner"}
                {formData.energy === 2 && "Moderate"}
                {formData.energy === 3 && "Active"}
                {formData.energy === 4 && "Experienced"}
                {formData.energy === 5 && "Advanced"}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Past Experiences</h4>
              <p className="text-base">{formData.pastExperiences || "None shared"}</p>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Expectations</h4>
              <p className="text-base">{formData.expectations || "None shared"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        variants={item}
        className="flex justify-center pt-6"
      >
        <Button 
          onClick={onSubmit}
          className="w-full py-6 text-base font-medium"
          variant="premium"
          size="lg"
        >
          Begin Your Himalayan Journey
        </Button>
      </motion.div>
    </motion.div>
  );
}
