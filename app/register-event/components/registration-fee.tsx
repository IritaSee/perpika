"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/ui/file-upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { AttendingAs, SessionType, RegistrationType } from "../constants"
import { formSchema } from "../schemas"
import { uploadFile } from "@/lib/upload"
import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

// First 35 online participants are free
const MAX_FREE_ONLINE_PARTICIPANTS = 35
const CURRENT_ONLINE_PARTICIPANTS = 35 // This should be fetched from the backend

const REGISTRATION_FEES = {
  [RegistrationType.ONLINE_PARTICIPANT_ONE_DAY]: { 
    regular: CURRENT_ONLINE_PARTICIPANTS < MAX_FREE_ONLINE_PARTICIPANTS ? 0 : 40000, 
    earlyBird: CURRENT_ONLINE_PARTICIPANTS < MAX_FREE_ONLINE_PARTICIPANTS ? 0 : 40000 
  },
  [RegistrationType.ONLINE_PARTICIPANT_TWO_DAYS]: { 
    regular: CURRENT_ONLINE_PARTICIPANTS < MAX_FREE_ONLINE_PARTICIPANTS ? 0 : 50000, 
    earlyBird: CURRENT_ONLINE_PARTICIPANTS < MAX_FREE_ONLINE_PARTICIPANTS ? 0 : 50000 
  },
  [RegistrationType.OFFLINE_PARTICIPANT_ONE_DAY]: { regular: 75000, earlyBird: 75000 },
  [RegistrationType.OFFLINE_PARTICIPANT_TWO_DAYS]: { regular: 100000, earlyBird: 100000 },
  [RegistrationType.PRESENTER_INDONESIA_STUDENT_ONLINE]: { regular: 100000, earlyBird: 75000 },
  [RegistrationType.PRESENTER_INDONESIA_STUDENT_OFFLINE]: { regular: 150000, earlyBird: 100000 },
  [RegistrationType.PRESENTER_FOREIGNER_ONLINE]: { regular: 250000, earlyBird: 175000 },
  [RegistrationType.PRESENTER_FOREIGNER_OFFLINE]: { regular: 275000, earlyBird: 200000 },
}

interface RegistrationFeeProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  attendingAs: string | undefined
  sessionType: string | undefined
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const isEarlyBird = () => {
  const earlyBirdEndDate = new Date('2024-03-31T23:59:59')
  return new Date() <= earlyBirdEndDate
}

export function RegistrationFee({ form, attendingAs, sessionType }: RegistrationFeeProps) {
  const [currentFee, setCurrentFee] = useState<number>(0)
  const [isEarlyBirdPeriod, setIsEarlyBirdPeriod] = useState(isEarlyBird())
  const [days, setDays] = useState<"one" | "two">("one")

  // Watch for nationality changes when in presenter mode
  const formValues = form.watch()
  const isIndonesianStudent = useMemo(() => {
    if (!formValues || !attendingAs || attendingAs !== AttendingAs.PRESENTER) return true
    
    // Type guard to check if we have presenter form values
    const values = formValues as z.infer<typeof formSchema> & { attendingAs: "PRESENTER" }
    if (values.presenters?.[0]?.nationality) {
      return values.presenters[0].nationality.toLowerCase() === 'indonesia'
    }
    
    return true // Default to Indonesian pricing
  }, [formValues, attendingAs])

  // Initialize registration type
  useEffect(() => {
    if (!attendingAs || !sessionType) return

    let newRegistrationType: keyof typeof REGISTRATION_FEES | null = null

    if (attendingAs === AttendingAs.PARTICIPANT) {
      if (sessionType === SessionType.ONLINE) {
        newRegistrationType = days === "one" 
          ? RegistrationType.ONLINE_PARTICIPANT_ONE_DAY
          : RegistrationType.ONLINE_PARTICIPANT_TWO_DAYS
      } else {
        newRegistrationType = days === "one"
          ? RegistrationType.OFFLINE_PARTICIPANT_ONE_DAY
          : RegistrationType.OFFLINE_PARTICIPANT_TWO_DAYS
      }
    } else {
      // For presenters
      if (sessionType === SessionType.ONLINE) {
        newRegistrationType = isIndonesianStudent
          ? RegistrationType.PRESENTER_INDONESIA_STUDENT_ONLINE
          : RegistrationType.PRESENTER_FOREIGNER_ONLINE
      } else {
        newRegistrationType = isIndonesianStudent
          ? RegistrationType.PRESENTER_INDONESIA_STUDENT_OFFLINE
          : RegistrationType.PRESENTER_FOREIGNER_OFFLINE
      }
    }

    if (newRegistrationType) {
      // Initialize with empty string if no value exists
      if (!form.getValues('registrationType')) {
        form.setValue('registrationType', newRegistrationType, { shouldValidate: true })
      }
      const fees = REGISTRATION_FEES[newRegistrationType]
      if (fees) {
        setCurrentFee(isEarlyBirdPeriod ? fees.earlyBird : fees.regular)
      }
    }
  }, [attendingAs, sessionType, days, isIndonesianStudent, form, isEarlyBirdPeriod])

  return (
    <div className="border-b p-6 md:p-8">
      {isEarlyBirdPeriod && (
        <Card className="mb-4 p-4 bg-green-50 border-green-200">
          <p className="text-green-700 font-medium">
            Early Bird Registration is Active! (Until March 31, 2024)
          </p>
          <p className="text-green-600 text-sm mt-1">
            Register now to get special early bird pricing
          </p>
        </Card>
      )}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Registration Fee</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {sessionType === SessionType.ONLINE && attendingAs === AttendingAs.PARTICIPANT ? (
            CURRENT_ONLINE_PARTICIPANTS >= MAX_FREE_ONLINE_PARTICIPANTS ? (
              "Free registration slots are full. Regular pricing applies."
            ) : (
              "First 35 online participants register for free!"
            )
          ) : (
            "Select your registration type and upload payment proof"
          )}
        </p>
      </div>

      {attendingAs === AttendingAs.PARTICIPANT && (
        <div className="mb-6">
          <FormLabel className="block mb-2">Number of Days</FormLabel>
          <RadioGroup
            defaultValue="one"
            onValueChange={(value) => setDays(value as "one" | "two")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one" id="one-day" />
              <label htmlFor="one-day" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                1 Day
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="two" id="two-days" />
              <label htmlFor="two-days" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                2 Days
              </label>
            </div>
          </RadioGroup>
        </div>
      )}

      <div className="mb-6">
        <FormLabel className="flex items-center justify-between mb-2">
          <span>Registration Fee</span>
          <span className="text-primary font-medium">
            {currentFee === 0 ? 'Free' : currentFee > 0 ? formatPrice(currentFee) : 'Calculating...'}
          </span>
        </FormLabel>
        <div className="text-sm text-muted-foreground">
          {attendingAs === AttendingAs.PARTICIPANT ? (
            <p>
              {sessionType === SessionType.ONLINE ? 'Online' : 'Offline'} Participant - {days === "one" ? '1 Day' : '2 Days'}
            </p>
          ) : (
            <p>
              {isIndonesianStudent ? 'Indonesian' : 'International'} Presenter - {sessionType === SessionType.ONLINE ? 'Online' : 'Offline'}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <FormLabel>Bank Account Information</FormLabel>
        <Card className="p-4">
          <p className="text-sm font-medium">Bank: [Bank Name]</p>
          <p className="text-sm">Account Number: [Account Number]</p>
          <p className="text-sm">Account Holder: [Account Holder Name]</p>
        </Card>
      </div>

      <FormField
        control={form.control}
        name="agreeToTerms"
        render={({ field }) => (
          <FormItem className="mb-6">
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label
                  htmlFor="agreeToTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Terms and Conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </a>{" "}
                  of the event registration.
                </p>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="registrationType"
        render={({ field }) => (
          <input 
            type="hidden" 
            {...field}
            value={field.value || ''} 
          />
        )}
      />

      <FormField
        control={form.control}
        name="proofOfPayment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Proof</FormLabel>
            {!field.value ? (
              <FormControl>
                <FileUpload
                  onChange={async (files) => {
                    if (files[0]) {
                      try {
                        const url = await uploadFile(files[0], 'payment-proofs')
                        field.onChange(url)
                      } catch (error) {
                        console.error('Upload failed:', error)
                      }
                    }
                  }}
                />
              </FormControl>
            ) : (
              <div className="mt-2 space-y-4">
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment Proof Uploaded</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => field.onChange('')}
                    >
                      <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                  <div className="mt-2 relative rounded-lg overflow-hidden border">
                    <img 
                      src={field.value} 
                      alt="Payment proof" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => field.onChange('')}
                >
                  Upload Different Image
                </Button>
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
