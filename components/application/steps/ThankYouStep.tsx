'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  formData: {
    firstName: string;
  };
};

export default function ThankYouStep({ formData }: Props) {
  return (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Application Received</h2>
        <p className="text-muted-foreground text-lg">
          Thank you, {formData.firstName}! Your journey with us begins now.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-muted/30 rounded-lg border border-border/50 max-w-md mx-auto"
      >
        <p className="mb-4">
          We&apos;ve received your application and will be in touch within 48 hours to discuss the next steps of your Himalayan journey.
        </p>
        <p className="text-muted-foreground">
          In the meantime, explore our blog for stories from fellow travelers and preparation tips.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/blog">Read Travel Stories</Link>
          </Button>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}