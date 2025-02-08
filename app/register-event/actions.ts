'use server'

import { db } from '@/lib/db'
import { formSchema } from './schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function registerEvent(formData: FormData) {
  try {
    // Convert FormData to object
    const rawData = Object.fromEntries(formData.entries())
    
    // Parse boolean values
    const data = {
      ...rawData,
      agreeToTerms: rawData.agreeToTerms === 'true',
      // Parse presenters array if it exists
      presenters: rawData.presenters ? JSON.parse(String(rawData.presenters)) : undefined,
    }

    // Validate the data
    const validatedData = formSchema.parse(data)

    // Create registration in database with the appropriate related records
    const registration = await db.registration.create({
      data: {
        attendingAs: validatedData.attendingAs,
        sessionType: validatedData.sessionType,
        registrationType: validatedData.registrationType,
        proofOfPayment: validatedData.proofOfPayment,
        paymentStatus: 'PENDING', // Add paymentStatus and set to PENDING

        // Create the appropriate registration type based on attendingAs
        ...(validatedData.attendingAs === 'PRESENTER' ? {
          presenterRegistration: {
            create: {
              email: validatedData.email,
              currentStatus: validatedData.currentStatus,
              affiliation: validatedData.affiliation,
              topicPreference: validatedData.topicPreference,
              presentationTitle: validatedData.presentationTitle,
              abstractSubmission: validatedData.abstractSubmission,
              dietaryPreference: validatedData.dietaryPreference,
              // Create related presenters
              presenters: {
                create: validatedData.presenters.map((presenter: any, index: number) => ({
                  ...presenter,
                  order: index + 1
                }))
              }
            }
          }
        } : {
          participantRegistration: {
            create: {
              fullName: validatedData.fullName,
              gender: validatedData.gender,
              nationality: validatedData.nationality,
              cityState: validatedData.cityState,
              email: validatedData.email,
              currentStatus: validatedData.currentStatus,
              affiliation: validatedData.affiliation,
              dietaryPreference: validatedData.dietaryPreference,
            }
          }
        })
      },
      include: {
        presenterRegistration: {
          include: {
            presenters: true
          }
        },
        participantRegistration: true
      }
    })

    revalidatePath('/register-event')
    redirect('/register-event/thank-you')

    return { success: true, data: registration }
  } catch (error: any) {
    console.error('Registration error:', error)
    return { 
      success: false, 
      error: error.message || 'Something went wrong'
    }
  }
}
