'use client'

import type React from 'react'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    dietary: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('RSVP submitted:', formData)
    alert('Thank you for your RSVP! We will be in touch soon.')
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="rsvp" className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary text-balance">
          RSVP
        </h2>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-card-foreground">
              We Can&apos;t Wait to Celebrate With You!
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Please respond by August 1, 2026
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-4">
                <Label>Will you be attending? *</Label>
                <RadioGroup
                  value={formData.attendance}
                  onValueChange={(value) => handleChange('attendance', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes, I&apos;ll be there!</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">Sorry, I can&apos;t make it</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">
                  Number of Guests (including yourself)
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="4"
                  value={formData.guests}
                  onChange={(e) => handleChange('guests', e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary">
                  Dietary Restrictions or Allergies
                </Label>
                <Input
                  id="dietary"
                  value={formData.dietary}
                  onChange={(e) => handleChange('dietary', e.target.value)}
                  placeholder="Please let us know of any dietary needs"
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Special Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Share your excitement or any special requests"
                  className="bg-input border-border min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg"
              >
                Send RSVP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
