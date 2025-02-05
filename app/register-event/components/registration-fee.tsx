"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { AttendingAs, SessionType, RegistrationType } from "../constants"
import { formSchema } from "../schemas"

interface RegistrationFeeProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  attendingAs: string | undefined
  sessionType: string | undefined
}

export function RegistrationFee({ form, attendingAs, sessionType }: RegistrationFeeProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Part 4: Registration Fee</h2>
      
      <FormField
        control={form.control}
        name="registrationType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Registration Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select registration type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {attendingAs === AttendingAs.PARTICIPANT ? (
                  sessionType === SessionType.ONLINE ? (
                    <>
                      <SelectItem value={RegistrationType.ONLINE_PARTICIPANT_ONE_DAY}>
                        Online Participant 1 Day
                      </SelectItem>
                      <SelectItem value={RegistrationType.ONLINE_PARTICIPANT_TWO_DAYS}>
                        Online Participant 2 Days
                      </SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value={RegistrationType.OFFLINE_PARTICIPANT_ONE_DAY}>
                        Offline Participant 1 Day
                      </SelectItem>
                      <SelectItem value={RegistrationType.OFFLINE_PARTICIPANT_TWO_DAYS}>
                        Offline Participant 2 Days
                      </SelectItem>
                    </>
                  )
                ) : sessionType === SessionType.ONLINE ? (
                  <>
                    <SelectItem value={RegistrationType.PRESENTER_INDONESIA_STUDENT_ONLINE}>
                      Indonesian Student Presenter Online
                    </SelectItem>
                    <SelectItem value={RegistrationType.PRESENTER_FOREIGNER_ONLINE}>
                      International Presenter Online
                    </SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value={RegistrationType.PRESENTER_INDONESIA_STUDENT_OFFLINE}>
                      Indonesian Student Presenter Offline
                    </SelectItem>
                    <SelectItem value={RegistrationType.PRESENTER_FOREIGNER_OFFLINE}>
                      International Presenter Offline
                    </SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="proofOfPayment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Proof</FormLabel>
            <FormControl>
              <Input type="file" accept="image/*,.pdf" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
