import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// Get current early bird status
export async function GET() {
  try {
    const currentPeriod = await db.earlyBirdPeriod.findFirst({
      where: {
        isActive: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      }
    })

    return NextResponse.json({
      isEarlyBird: !!currentPeriod,
      period: currentPeriod
    })
  } catch (error) {
    console.error('Error fetching early bird status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch early bird status' },
      { status: 500 }
    )
  }
}

// Create new early bird period
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { startDate, endDate } = body

    // Validate dates
    const start = new Date(startDate)
    // Set end date to end of day (23:59:59.999)
    const end = new Date(endDate)
    if (end.getHours() === 0 && end.getMinutes() === 0) {
      end.setHours(23, 59, 59, 999)
    }

    if (end <= start) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }

    // Deactivate any currently active periods
    await db.earlyBirdPeriod.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })

    // Create new period
    const newPeriod = await db.earlyBirdPeriod.create({
      data: {
        startDate: start,
        endDate: end,
        isActive: true
      }
    })

    return NextResponse.json(newPeriod)
  } catch (error) {
    console.error('Error creating early bird period:', error)
    return NextResponse.json(
      { error: 'Failed to create early bird period' },
      { status: 500 }
    )
  }
}

// Update early bird period
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, startDate, endDate, isActive } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Period ID is required' },
        { status: 400 }
      )
    }

    const updatedPeriod = await db.earlyBirdPeriod.update({
      where: { id },
      data: {
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(typeof isActive === 'boolean' && { isActive })
      }
    })

    return NextResponse.json(updatedPeriod)
  } catch (error) {
    console.error('Error updating early bird period:', error)
    return NextResponse.json(
      { error: 'Failed to update early bird period' },
      { status: 500 }
    )
  }
}

// Get early bird statistics
export async function HEAD() {
  try {
    const [totalRegistrations, earlyBirdRegistrations] = await Promise.all([
      db.registration.count(),
      db.registration.count({
        where: { isEarlyBird: true }
      })
    ])

    return NextResponse.json({
      total: totalRegistrations,
      earlyBird: earlyBirdRegistrations,
      percentage: totalRegistrations > 0 
        ? (earlyBirdRegistrations / totalRegistrations) * 100 
        : 0
    })
  } catch (error) {
    console.error('Error fetching early bird statistics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch early bird statistics' },
      { status: 500 }
    )
  }
}
