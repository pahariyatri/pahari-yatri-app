'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type Props = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    calling: string;
    season: string;
    companionship: string;
    energy: string;
    pastExperiences: string;
    expectations: string;
  };
  onSubmit: () => void;
};

export default function FinalStep({ formData, onSubmit }: Props) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2">Ready to Begin Your Journey?</h2>
        <p className="text-muted-foreground">
          Review your information and submit your application when you&apos;re ready.
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
            <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
            <p className="text-base">{formData.email}</p>
            <p className="text-base">{formData.phone}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center pt-4"
      >
        <Button 
          onClick={onSubmit}
          size="lg"
          className="px-8"
        >
          Submit Application
        </Button>
      </motion.div>
    </div>
  );
}