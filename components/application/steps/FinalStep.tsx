'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
 // Reuse the type from ApplicationForm

 type FormData = {
  firstName: string;
  lastName: string;
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
  return (
    <div className="space-y-4">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-4"
      >
        <h2 className="text-xl font-bold mb-1">Review Your Journey</h2>
      </motion.div>

      {/* Personal Info */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/50"
      >
        <div className="grid grid-cols-1 gap-3">
          <div>
            <h3 className="text-xs font-medium text-muted-foreground">Name</h3>
            <p className="text-sm">{formData.firstName} {formData.lastName}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-muted-foreground">Contact</h3>
            <p className="text-sm">{formData.email}</p>
            <p className="text-sm">{formData.phone}</p>
          </div>
        </div>
      </motion.div>

      {/* Journey Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        <div className="bg-muted/30 p-3 rounded-lg space-y-2">
          <div>
            <h3 className="text-base font-semibold mb-1 flex items-center">
              Journey Details
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Intention</p>
                <p className="text-sm">{formData.calling}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Season</p>
                <p className="text-sm">{formData.season}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fitness Level</p>
                <p className="text-sm">
                  {formData.energy ? `Level ${formData.energy}` : "Not specified"}
                </p>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">Past Experiences</p>
              <p className="text-sm">{formData.pastExperiences || "None shared"}</p>
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">Expectations</p>
              <p className="text-sm">{formData.expectations || "None shared"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center pt-4"
      >
        <Button 
          onClick={onSubmit}
          className="w-full py-2"
        >
          Begin Your Journey
        </Button>
      </motion.div>
    </div>
  );
}
