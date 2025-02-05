import * as z from "zod"
import {
  AttendingAs,
  SessionType,
  CurrentStatus,
  TopicPreference,
  DietaryPreference,
  Gender,
  RegistrationType,
} from "./constants"

// Base schema for common fields
export const baseSchema = z.object({
  // Section 1: Basic registration details
  attendingAs: z.enum([AttendingAs.PRESENTER, AttendingAs.PARTICIPANT], {
    required_error: "Please select your attendance type",
  }),
  sessionType: z.enum([SessionType.ONLINE, SessionType.OFFLINE], {
    required_error: "Please select your session type",
  }),
  
  // Section 4: Registration Fee details
  registrationType: z.enum([
    RegistrationType.ONLINE_PARTICIPANT_ONE_DAY,
    RegistrationType.ONLINE_PARTICIPANT_TWO_DAYS,
    RegistrationType.OFFLINE_PARTICIPANT_ONE_DAY,
    RegistrationType.OFFLINE_PARTICIPANT_TWO_DAYS,
    RegistrationType.PRESENTER_INDONESIA_STUDENT_ONLINE,
    RegistrationType.PRESENTER_INDONESIA_STUDENT_OFFLINE,
    RegistrationType.PRESENTER_FOREIGNER_ONLINE,
    RegistrationType.PRESENTER_FOREIGNER_OFFLINE,
  ], {
    required_error: "Please select your registration type",
  }),
  proofOfPayment: z.string().min(1, {
    message: "Payment proof must be uploaded",
  }),
  agreeToTerms: z.boolean({
    required_error: "You must agree to the terms and conditions",
  }),
})

// Schema for individual presenter
const presenterSchema = z.object({
  name: z.string().min(1, { message: "Presenter name is required" }),
  nationality: z.string().min(1, { message: "Presenter nationality is required" }),
})

// Schema for presenter-specific fields
export const presenterRegistrationSchema = z.object({
  presenters: z.array(presenterSchema)
    .min(1, { message: "At least one presenter is required" })
    .max(3, { message: "Maximum of three presenters allowed" }),
  email: z.string().email({ message: "Invalid email format" }),
  currentStatus: z.enum([
    CurrentStatus.BACHELOR_STUDENT,
    CurrentStatus.MASTER_STUDENT,
    CurrentStatus.PHD_STUDENT,
    CurrentStatus.RESEARCHER_PROFESSIONAL,
    CurrentStatus.OTHER,
  ], {
    required_error: "Please select your current status",
  }),
  affiliation: z.string().min(1, { message: "Affiliation is required" }),
  topicPreference: z.enum([
    TopicPreference.ENGINEERING,
    TopicPreference.HEALTH_SCIENCE,
    TopicPreference.LIFE_SCIENCE,
    TopicPreference.EARTH_SCIENCE,
    TopicPreference.MATERIAL_SCIENCE,
    TopicPreference.SOCIAL_LAW_POLITICAL_SCIENCE,
    TopicPreference.HUMANITIES,
    TopicPreference.SPORTS_AND_ARTS,
    TopicPreference.BUSINESS_PUBLIC_ADMINISTRATION,
    TopicPreference.EDUCATION,
  ], {
    required_error: "Please select your topic preference",
  }),
  presentationTitle: z.string().min(1, { message: "Presentation title is required" }),
  abstractSubmission: z.string().min(1, { message: "Abstract must be uploaded" }),
  dietaryPreference: z.enum([DietaryPreference.VEGAN, DietaryPreference.HALAL]).optional(),
})

// Schema for participant-specific fields
export const participantSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  gender: z.enum([Gender.FEMALE, Gender.MALE], {
    required_error: "Please select your gender",
  }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  cityState: z.string().min(1, { message: "City/State is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  currentStatus: z.enum([
    CurrentStatus.BACHELOR_STUDENT,
    CurrentStatus.MASTER_STUDENT,
    CurrentStatus.PHD_STUDENT,
    CurrentStatus.RESEARCHER_PROFESSIONAL,
    CurrentStatus.OTHER,
  ], {
    required_error: "Please select your current status",
  }),
  affiliation: z.string().min(1, { message: "Affiliation is required" }),
  dietaryPreference: z.enum([DietaryPreference.VEGAN, DietaryPreference.HALAL]).optional(),
})

// Combined form schema
const { attendingAs: _, ...baseSchemaWithoutAttending } = baseSchema.shape

export const formSchema = z.discriminatedUnion("attendingAs", [
  z.object({
    attendingAs: z.literal(AttendingAs.PRESENTER),
    ...baseSchemaWithoutAttending,
    ...presenterRegistrationSchema.shape,
  }),
  z.object({
    attendingAs: z.literal(AttendingAs.PARTICIPANT),
    ...baseSchemaWithoutAttending,
    ...participantSchema.shape,
  }),
])
