import { PrismaClient, RegistrationType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Delete existing registration fees
  await prisma.registrationFee.deleteMany()

  // Create registration fees with early bird prices
  const registrationFees = [
    {
      registrationType: RegistrationType.ONLINE_PARTICIPANT_ONE_DAY,
      regularFee: 50000,
      earlyBirdFee: 50000,
    },
    {
      registrationType: RegistrationType.ONLINE_PARTICIPANT_TWO_DAYS,
      regularFee: 50000,
      earlyBirdFee: 50000,
    },
    {
      registrationType: RegistrationType.OFFLINE_PARTICIPANT_ONE_DAY,
      regularFee: 50000,
      earlyBirdFee: 50000,
    },
    {
      registrationType: RegistrationType.OFFLINE_PARTICIPANT_TWO_DAYS,
      regularFee: 50000,
      earlyBirdFee: 50000,
    },
    {
      registrationType: RegistrationType.PRESENTER_INDONESIA_STUDENT_ONLINE,
      regularFee: 100000,
      earlyBirdFee: 75000,
    },
    {
      registrationType: RegistrationType.PRESENTER_INDONESIA_STUDENT_OFFLINE,
      regularFee: 100000,
      earlyBirdFee: 75000,
    },
    {
      registrationType: RegistrationType.PRESENTER_FOREIGNER_ONLINE,
      regularFee: 200000,
      earlyBirdFee: 125000,
    },
    {
      registrationType: RegistrationType.PRESENTER_FOREIGNER_OFFLINE,
      regularFee: 200000,
      earlyBirdFee: 125000,
    },
  ]

  for (const fee of registrationFees) {
    await prisma.registrationFee.create({
      data: fee,
    })
  }

  console.log('Registration fees seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
