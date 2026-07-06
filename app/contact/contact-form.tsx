'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Mountain } from 'lucide-react'
import { motion } from 'framer-motion'

const INTEREST_OPTIONS = [
  { id: 'spiritual', label: 'Spiritual Journeys' },
  { id: 'adventure', label: 'Adventure Treks' },
  { id: 'cultural', label: 'Cultural Immersion' },
  { id: 'photography', label: 'Photography' },
]

type State = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    interests: [] as string[],
    message: '',
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const toggleInterest = (id: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id],
    }))
  }

  const canSubmit = form.firstName && form.email && form.message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setState('loading')
    try {
      const res = await fetch('/api/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...form }),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
          <Mountain className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-2xl font-bold font-brandSerif text-foreground mb-3">
          Message received.
        </h3>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          We read every message. You will hear from us within 24 hours — sooner if the mountains allow it.
        </p>
      </motion.div>
    )
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Your first name"
                value={form.firstName}
                onChange={set('firstName')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Your last name"
                value={form.lastName}
                onChange={set('lastName')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={form.email}
              onChange={set('email')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={set('phone')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Trekking Experience</Label>
            {mounted ? (
              <Select
                value={form.experience}
                onValueChange={(v) => setForm(prev => ({ ...prev, experience: v }))}
              >
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner — first time trekker</SelectItem>
                  <SelectItem value="intermediate">Intermediate — 2–5 treks completed</SelectItem>
                  <SelectItem value="advanced">Advanced — 5+ treks, high altitude</SelectItem>
                  <SelectItem value="expert">Expert — technical climbing, mountaineering</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                Select your experience level
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Areas of Interest</Label>
            <div className="grid grid-cols-2 gap-3">
              {INTEREST_OPTIONS.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={form.interests.includes(id)}
                    onCheckedChange={() => toggleInterest(id)}
                  />
                  <Label htmlFor={id} className="text-sm font-normal cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Why do you want to join Pahari Yatri? *</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your journey, what you're seeking, and how you hope to grow through this experience..."
              rows={4}
              value={form.message}
              onChange={set('message')}
              required
            />
          </div>

          {state === 'error' && (
            <p className="text-sm text-destructive">
              Something went wrong. Please try again or write to us directly.
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || state === 'loading'}
          >
            {state === 'loading' ? 'Sending...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
