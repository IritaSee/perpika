"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { CurrentStatus, TopicPreference, DietaryPreference, SessionType } from "../constants"
import { formSchema } from "../schemas"

interface PresenterFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  sessionType: string | undefined
}

export function PresenterForm({ form, sessionType }: PresenterFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Part 2: Presenter Information</h2>
      
      <FormField
        control={form.control}
        name="firstAuthorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Author Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter first author name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="firstAuthorNationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Author Nationality</FormLabel>
            <FormControl>
              <Input placeholder="Enter first author nationality" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="secondAuthorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Second Author Name (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter second author name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="secondAuthorNationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Second Author Nationality (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter second author nationality" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="thirdAuthorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Third Author Name (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter third author name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="thirdAuthorNationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Third Author Nationality (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter third author nationality" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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

      <FormField
        control={form.control}
        name="topicPreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Topic Preference</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={TopicPreference.ENGINEERING}>Engineering</SelectItem>
                <SelectItem value={TopicPreference.HEALTH_SCIENCE}>Health Science</SelectItem>
                <SelectItem value={TopicPreference.LIFE_SCIENCE}>Life Science</SelectItem>
                <SelectItem value={TopicPreference.EARTH_SCIENCE}>Earth Science</SelectItem>
                <SelectItem value={TopicPreference.MATERIAL_SCIENCE}>Material Science</SelectItem>
                <SelectItem value={TopicPreference.SOCIAL_LAW_POLITICAL_SCIENCE}>Social, Law & Political Science</SelectItem>
                <SelectItem value={TopicPreference.HUMANITIES}>Humanities</SelectItem>
                <SelectItem value={TopicPreference.SPORTS_AND_ARTS}>Sports & Arts</SelectItem>
                <SelectItem value={TopicPreference.BUSINESS_PUBLIC_ADMINISTRATION}>Business & Public Administration</SelectItem>
                <SelectItem value={TopicPreference.EDUCATION}>Education</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="presentationTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter presentation title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="abstractSubmission"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload Abstract (PDF)</FormLabel>
            <FormControl>
              <Input type="file" accept=".pdf" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {sessionType === SessionType.OFFLINE && (
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
                  <SelectItem value={DietaryPreference.VEGAN}>Vegan (Rice + Fried Tempeh)</SelectItem>
                  <SelectItem value={DietaryPreference.HALAL}>Halal (Rice + Grilled Chicken)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
