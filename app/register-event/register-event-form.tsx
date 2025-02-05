"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Presentation, Users, Globe, Building, Info } from "lucide-react"

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
      presenters: [{ name: "", nationality: "" }], // Initialize with one empty presenter
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Card className="overflow-hidden border-muted bg-card">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6 border-b p-6 md:p-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <h2 className="text-xl font-semibold tracking-tight">Basic Information</h2>
              </div>
              <p className="text-sm text-muted-foreground">Choose how you would like to participate in ICONIK 2025</p>
            </div>

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
                      className="flex flex-col space-y-3"
                    >
                      <FormItem className="group flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent transition-colors">
                        <FormControl>
                          <RadioGroupItem value={AttendingAs.PRESENTER} />
                        </FormControl>
                        <FormLabel className="flex w-full cursor-pointer items-center gap-2 font-medium group-hover:text-accent-foreground">
                          <Presentation className="h-4 w-4" /> Presenter
                        </FormLabel>
                      </FormItem>
                      <FormItem className="group flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent transition-colors">
                        <FormControl>
                          <RadioGroupItem value={AttendingAs.PARTICIPANT} />
                        </FormControl>
                        <FormLabel className="flex w-full cursor-pointer items-center gap-2 font-medium group-hover:text-accent-foreground">
                          <Users className="h-4 w-4" /> Participant
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
                      <FormItem className="group flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent transition-colors">
                        <FormControl>
                          <RadioGroupItem value={SessionType.ONLINE} />
                        </FormControl>
                        <FormLabel className="flex w-full cursor-pointer items-center gap-2 font-medium group-hover:text-accent-foreground">
                          <Globe className="h-4 w-4" /> Online
                        </FormLabel>
                      </FormItem>
                      <FormItem className="group flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent transition-colors">
                        <FormControl>
                          <RadioGroupItem value={SessionType.OFFLINE} />
                        </FormControl>
                        <FormLabel className="flex w-full cursor-pointer items-center gap-2 font-medium group-hover:text-accent-foreground">
                          <Building className="h-4 w-4" /> Offline
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

          <div className="border-t p-6 md:p-8">
            <Button type="submit" className="w-full">
            Register Event
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
