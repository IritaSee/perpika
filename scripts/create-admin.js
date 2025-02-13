const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createUser(email, password, name, role) {
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        role,
        name,
        password: hashedPassword
      },
      create: {
        email,
        password: hashedPassword,
        name,
        role
      },
    })

    console.log(`${role} user created:`, user.email)
    return user
  } catch (error) {
    console.error(`Error creating ${role} user:`, error)
    throw error
  }
}

async function main() {
  try {
    // Create admin user
    await createUser(
      'admin@example.com',
      'admin123',
      'Admin',
      'ADMIN'
    )

    // Create reviewer user
    await createUser(
      'reviewer@example.com',
      'reviewer123',
      'Reviewer',
      'REVIEWER'
    )

    console.log('All users created successfully')
  } catch (error) {
    console.error('Error in main:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
