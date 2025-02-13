"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState, useTransition } from "react"
import { Presentation, Users, Globe, Building, Info } from "lucide-react"
import { toast, Toaster } from "sonner"
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"

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
import { registerEvent } from "./actions"
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
      presenters: [{ name: "", nationality: "" }],
      email: "",
      password: "",
      currentStatus: undefined,
      affiliation: "",
      topicPreference: undefined,
      presentationTitle: "",
      PaperSubmission: "",
      dietaryPreference: undefined,
      fullName: "",
      gender: undefined,
      nationality: "",
      cityState: "",
      agreeToTerms: false,
    },
    mode: "onChange"
  })

  const formState = form.formState;
  useEffect(() => {
    console.log('Form State:', {
      isDirty: formState.isDirty,
      errors: formState.errors,
      values: form.getValues()
    });
  }, [formState, form]);

  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

    async function onSubmit(values: z.infer<typeof formSchema>) {
      setError(null);

      startTransition(async () => {
        try {
          const formData = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            if (key === 'presenters' && Array.isArray(value)) {
              formData.append(key, JSON.stringify(value));
            } else if (value !== undefined && value !== null) {
              formData.append(key, value.toString());
            }
          });

          const result = await registerEvent(formData);

          if (result.success) {
            toast.success('Registration submitted successfully!');
            router.push('/register-event/thank-you');
          } else {
            throw new Error(result.error);
          }

        } catch (error: any) {
          console.error('Registration error:', error);
          toast.error(error.message || 'Failed to submit registration');
        }
      });
    }

  return (
    <>
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <Card className="overflow-hidden border rounded-lg shadow-sm bg-card">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="p-6 md:p-8 space-y-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </div>
              <p className="text-sm text-muted-foreground">Choose how you would like to participate in ICONIK 2025</p>
            </div>

            <FormField
              control={form.control}
              name="attendingAs"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="font-medium">Attending As <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value)
                        setAttendingAs(value)
                      }}
                      value={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent ${field.value === AttendingAs.PRESENTER ? 'border-primary bg-primary/5' : ''}`}>
                        <FormControl>
                          <RadioGroupItem value={AttendingAs.PRESENTER} />
                        </FormControl>
                        <div className="p-1 bg-primary/10 rounded">
                          <Presentation className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Presenter</span>
                      </div>
                      <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent ${field.value === AttendingAs.PARTICIPANT ? 'border-primary bg-primary/5' : ''}`}>
                        <FormControl>
                          <RadioGroupItem value={AttendingAs.PARTICIPANT} />
                        </FormControl>
                        <div className="p-1 bg-primary/10 rounded">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Participant</span>
                      </div>
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
                  <FormLabel className="font-medium">Session Type <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value)
                        setSessionType(value)
                      }}
                      value={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent ${field.value === SessionType.ONLINE ? 'border-primary bg-primary/5' : ''}`}>
                        <FormControl>
                          <RadioGroupItem value={SessionType.ONLINE} />
                        </FormControl>
                        <div className="p-1 bg-primary/10 rounded">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Online</span>
                      </div>
                      <div className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent ${field.value === SessionType.OFFLINE ? 'border-primary bg-primary/5' : ''}`}>
                        <FormControl>
                          <RadioGroupItem value={SessionType.OFFLINE} />
                        </FormControl>
                        <div className="p-1 bg-primary/10 rounded">
                          <Building className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Offline</span>
                      </div>
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

          <div className="p-6 md:p-8 space-y-4 bg-muted/10">
            <Button 
              type="submit" 
              className="w-full"
              disabled={!form.formState.isValid || isPending}
            >
              {isPending ? "Submitting..." : "Register Event"}
            </Button>

            {Object.keys(form.formState.errors).length > 0 && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                Please fill in all required fields correctly
              </div>
            )}
          </div>
        </form>
      </Form>
    </Card>
    </motion.div>
    </>
  )
}
