"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { User, Mail, GraduationCap, Utensils, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { CurrentStatus, Gender, DietaryPreference, SessionType } from "../constants"
import { formSchema } from "../schemas"

interface ParticipantFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  sessionType: string | undefined
}

export function ParticipantForm({ form, sessionType }: ParticipantFormProps) {
  return (
    <div className="border rounded-lg shadow-sm bg-card p-6 md:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Participant Information</h2>
        </div>
        <p className="text-sm text-muted-foreground">Enter your personal details to register as a participant</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg mb-6">
            <User className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Personal Information</h3>
          </div>
          
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Full Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input className="bg-background" placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Gender <span className="text-destructive">*</span></FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                    <SelectItem value={Gender.MALE}>Male</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Nationality <span className="text-destructive">*</span></FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select your nationality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Indonesia">Indonesia</SelectItem>
                    <SelectItem value="Malaysia">Malaysia</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="Thailand">Thailand</SelectItem>
                    <SelectItem value="Vietnam">Vietnam</SelectItem>
                    <SelectItem value="Philippines">Philippines</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="South Korea">South Korea</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Netherlands">Netherlands</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cityState"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">City/State <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input className="bg-background" placeholder="Enter your city/state" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg mb-6">
            <Mail className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Contact Details</h3>
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Email <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input className="bg-background" type="email" placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg mb-6">
            <GraduationCap className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Academic Information</h3>
          </div>
          
          <FormField
            control={form.control}
            name="currentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Current Status <span className="text-destructive">*</span></FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select your current status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={CurrentStatus.BACHELOR_STUDENT}>Bachelor Student</SelectItem>
                    <SelectItem value={CurrentStatus.MASTER_STUDENT}>Master Student</SelectItem>
                    <SelectItem value={CurrentStatus.PHD_STUDENT}>PhD Student</SelectItem>
                    <SelectItem value={CurrentStatus.RESEARCHER_PROFESSIONAL}>Researcher/Professional</SelectItem>
                    <SelectItem value={CurrentStatus.OTHER}>Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="affiliation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Affiliation/Organization/Institution <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input className="bg-background" placeholder="Enter your affiliation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {sessionType === SessionType.OFFLINE && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg mb-6">
              <Utensils className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Additional Preferences</h3>
            </div>
            
            <FormField
              control={form.control}
              name="dietaryPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Dietary Preference <span className="text-destructive">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select your dietary preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={DietaryPreference.VEGAN}>Vegan (Rice + Indonesian Stir-Fried Tempe)</SelectItem>
                      <SelectItem value={DietaryPreference.HALAL}>Halal (Rice + Grilled Chicken)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  )
}
