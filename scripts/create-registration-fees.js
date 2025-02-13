const { PrismaClient, RegistrationType } = require('@prisma/client')

const prisma = new PrismaClient()

async function createRegistrationFee(data) {
  try {
    const fee = await prisma.registrationFee.create({
      data
    })
    console.log(`Registration fee created for type: ${fee.registrationType}`)
    return fee
  } catch (error) {
    console.error(`Error creating registration fee for type ${data.registrationType}:`, error)
    throw error
  }
}

async function main() {
  try {
    // Delete existing registration fees
    await prisma.registrationFee.deleteMany()
    console.log('Deleted existing registration fees')

    const registrationFees = [
      {
        registrationType: RegistrationType.ONLINE_PARTICIPANT_ONE_DAY,
        regularFee: 40000,
        earlyBirdFee: 40000,
      },
      {
        registrationType: RegistrationType.ONLINE_PARTICIPANT_TWO_DAYS,
        regularFee: 50000,
        earlyBirdFee: 50000,
      },
      {
        registrationType: RegistrationType.OFFLINE_PARTICIPANT_ONE_DAY,
        regularFee: 75000,
        earlyBirdFee: 75000,
      },
      {
        registrationType: RegistrationType.OFFLINE_PARTICIPANT_TWO_DAYS,
        regularFee: 100000,
        earlyBirdFee: 100000,
      },
      {
        registrationType: RegistrationType.PRESENTER_INDONESIA_STUDENT_ONLINE,
        regularFee: 100000,
        earlyBirdFee: 75000,
      },
      {
        registrationType: RegistrationType.PRESENTER_INDONESIA_STUDENT_OFFLINE,
        regularFee: 150000,
        earlyBirdFee: 100000,
      },
      {
        registrationType: RegistrationType.PRESENTER_FOREIGNER_ONLINE,
        regularFee: 250000,
        earlyBirdFee: 175000,
      },
      {
        registrationType: RegistrationType.PRESENTER_FOREIGNER_OFFLINE,
        regularFee: 275000,
        earlyBirdFee: 200000,
      },
    ]

    for (const fee of registrationFees) {
      await createRegistrationFee(fee)
    }

    console.log('All registration fees created successfully')
  } catch (error) {
    console.error('Error in main:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
