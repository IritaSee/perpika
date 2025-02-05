"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Users, Mail, GraduationCap, FileText, Utensils, PresentationIcon, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/ui/file-upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { UseFormReturn, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { CurrentStatus, TopicPreference, DietaryPreference, SessionType } from "../constants"
import { formSchema } from "../schemas"
import { uploadFile } from "@/lib/upload"

interface PresenterFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  sessionType: string | undefined
}

export function PresenterForm({ form, sessionType }: PresenterFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "presenters"
  })

  return (
    <div className="border-b p-6 md:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <PresentationIcon className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Presenter Information</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Add details for all presenters</p>
      </div>
      
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Presenter {index + 1}</h3>
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </div>
            
            <FormField
              control={form.control}
              name={`presenters.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name {index === 0 && "*"}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter presenter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`presenters.${index}.nationality`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality {index === 0 && "*"}</FormLabel>
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

          </div>
        ))}

        {fields.length < 3 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "", nationality: "" })}
            className="w-full bg-background hover:bg-accent"
          >
            + Add Another Presenter
          </Button>
        )}
      </div>

      <div className="mt-8 space-y-8">
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

        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <h3 className="text-sm font-medium text-muted-foreground">Presentation Details</h3>
          </div>

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
                <FileUpload
                  onChange={async (files) => {
                    if (files[0]) {
                      try {
                        const url = await uploadFile(files[0], 'abstracts')
                        field.onChange(url)
                      } catch (error) {
                        console.error('Upload failed:', error)
                      }
                    }
                  }}
                />
              </FormControl>
              {field.value && (
                <div className="text-sm text-green-600">
                  Abstract uploaded successfully
                </div>
              )}
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
