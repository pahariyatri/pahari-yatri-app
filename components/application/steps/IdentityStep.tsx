'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Props = {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
};

export default function IdentityStep({ formData, updateFormData, onNext }: Props) {
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
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="text-center mb-6">
        <h2 className="text-h2 font-brandSerif font-semibold mb-3 text-primary">Who are you?</h2>
        <p className="text-muted-foreground text-lg">
          Let's start with the basics. Tell us your name.
        </p>
      </motion.div>
      
      <motion.div variants={item} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" variant="premium" size="lg">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Your first name"
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
            variant="premium"
            size="lg"
            className={cn(
              "transition-all duration-300",
              formData.firstName ? "border-primary/70 shadow-brand-sm" : ""
            )}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" variant="premium" size="lg">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Your last name"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
            variant="premium"
            size="lg"
            className={cn(
              "transition-all duration-300",
              formData.lastName ? "border-primary/70 shadow-brand-sm" : ""
            )}
          />
        </div>
      </motion.div>
      
      <motion.div variants={item} className="pt-4">
        <Button
          onClick={onNext}
          variant="premium"
          size="lg"
          className="w-full h-14 shadow-brand-sm"
        >
          Continue Your Journey
        </Button>
      </motion.div>
    </motion.div>
  );
}
