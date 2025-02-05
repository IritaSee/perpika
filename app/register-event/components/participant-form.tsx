"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { User, Mail, GraduationCap, Utensils, Users, Globe } from "lucide-react"
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
    <div className="border-b p-6 md:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Participant Information</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Enter your personal details to register as a participant</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
          </div>
          
          <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter full name" {...field} />
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
            <FormLabel>Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
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
                <FormLabel>Nationality</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
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
            <FormLabel>City/State</FormLabel>
            <FormControl>
              <Input placeholder="Enter city/state" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <h3 className="text-sm font-medium text-muted-foreground">Contact Details</h3>
          </div>
          
          <FormField
            control={form.control}
            name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <h3 className="text-sm font-medium text-muted-foreground">Academic Information</h3>
          </div>
          
          <FormField
            control={form.control}
            name="currentStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
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
            <FormLabel>Affiliation/Organization/Institution</FormLabel>
            <FormControl>
              <Input placeholder="Enter affiliation" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        </div>

        {sessionType === SessionType.OFFLINE && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <h3 className="text-sm font-medium text-muted-foreground">Additional Preferences</h3>
            </div>
            
            <FormField
              control={form.control}
              name="dietaryPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dietary preference" />
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
