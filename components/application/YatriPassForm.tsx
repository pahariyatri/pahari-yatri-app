'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Mountain } from 'lucide-react'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function YatriPassForm() {
  const [state, setState] = useState<State>('idle')
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    calling: '',
    season: '',
    priorExperience: '',
  })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const canSubmit =
    form.fullName.trim() &&
    form.email.trim() &&
    form.calling.trim().length >= 20 &&
    form.season &&
    form.priorExperience

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setState('loading')
    try {
      const res = await fetch('/api/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'yatri-pass', ...form }),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <motion.div
        className="text-center py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Mountain className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-3xl font-bold font-brandSerif text-foreground mb-4">
          Your intention has been received.
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          The mountains know you are coming. We will reach out when your season arrives.
          Keep your spirit ready.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div className="space-y-2">
        <Label htmlFor="yp-name">Your Name</Label>
        <Input
          id="yp-name"
          placeholder="The name you carry on the trail"
          value={form.fullName}
          onChange={set('fullName')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yp-email">Email</Label>
        <Input
          id="yp-email"
          type="email"
          placeholder="Where we will send your invitation"
          value={form.email}
          onChange={set('email')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yp-season">Which season calls to you?</Label>
        <Select
          value={form.season}
          onValueChange={(v) => setForm(prev => ({ ...prev, season: v }))}
          required
        >
          <SelectTrigger id="yp-season">
            <SelectValue placeholder="Choose your season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monsoon">Monsoon — when the mountains weep and bloom</SelectItem>
            <SelectItem value="autumn">Autumn — clear skies, golden paths</SelectItem>
            <SelectItem value="winter">Winter — silence deeper than snow</SelectItem>
            <SelectItem value="spring">Spring — the first step after a long stillness</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="yp-exp">Have you walked the Himalayas before?</Label>
        <Select
          value={form.priorExperience}
          onValueChange={(v) => setForm(prev => ({ ...prev, priorExperience: v }))}
          required
        >
          <SelectTrigger id="yp-exp">
            <SelectValue placeholder="Your relationship with the mountains" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first-time">First time seeker — the mountains are calling me home</SelectItem>
            <SelectItem value="some">I have trekked before, but not like this</SelectItem>
            <SelectItem value="experienced">The Himalayas know my footsteps well</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="yp-calling">What calls you to the mountains?</Label>
        <Textarea
          id="yp-calling"
          placeholder="Write honestly. The mountains read intention, not words. (at least 20 characters)"
          rows={4}
          value={form.calling}
          onChange={set('calling')}
          required
          minLength={20}
        />
        <p className="text-xs text-muted-foreground/60">
          {form.calling.length} characters — minimum 20
        </p>
      </div>

      {state === 'error' && (
        <p className="text-sm text-destructive text-center">
          Something went astray. Please try again or write to us directly.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full text-base font-medium"
        disabled={!canSubmit || state === 'loading'}
      >
        {state === 'loading' ? (
          'Sending your intention...'
        ) : (
          <>
            Request Your Invitation
            <Sparkles className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
