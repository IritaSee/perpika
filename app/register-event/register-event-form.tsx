"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"

import { AttendingAs, SessionType } from "./constants"
import { formSchema } from "./schemas"
import { PresenterForm } from "./components/presenter-form"
import { ParticipantForm } from "./components/participant-form"
import { RegistrationFee } from "./components/registration-fee"

export default function RegisterEventForm() {
  const [attendingAs, setAttendingAs] = useState<string | undefined>()
  const [sessionType, setSessionType] = useState<string | undefined>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendingAs: undefined,
      sessionType: undefined,
      registrationType: undefined,
      proofOfPayment: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Part 1: Basic Information</h2>
            
            <FormField
              control={form.control}
              name="attendingAs"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Attending As</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value)
                        setAttendingAs(value)
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={AttendingAs.PRESENTER} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Presenter
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={AttendingAs.PARTICIPANT} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Participant
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sessionType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Session Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value)
                        setSessionType(value)
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={SessionType.ONLINE} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Online
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={SessionType.OFFLINE} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Offline
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {attendingAs === AttendingAs.PRESENTER && (
            <PresenterForm form={form} sessionType={sessionType} />
          )}

          {attendingAs === AttendingAs.PARTICIPANT && (
            <ParticipantForm form={form} sessionType={sessionType} />
          )}

          {attendingAs && sessionType && (
            <RegistrationFee 
              form={form} 
              attendingAs={attendingAs} 
              sessionType={sessionType} 
            />
          )}

          <Button type="submit" className="w-full">
            Register Event
          </Button>
        </form>
      </Form>
    </Card>
  )
}
