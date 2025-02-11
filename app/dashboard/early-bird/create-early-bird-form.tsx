"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

export function CreateEarlyBirdForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const startDate = formData.get('startDate')
      const endDate = formData.get('endDate')

      const response = await fetch('/api/early-bird', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create early bird period')
      }

      toast.success('Early bird period created successfully')
      
      // Reset form
      event.currentTarget.reset()
      
      // Refresh the page to show new data
      window.location.reload()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">
          Start Date
        </label>
        <Input
          type="datetime-local"
          name="startDate"
          required
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">
          End Date
        </label>
        <Input
          type="datetime-local"
          name="endDate"
          required
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Early Bird Period"}
      </Button>
    </form>
  )
}
