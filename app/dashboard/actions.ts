'use server'

import { db } from "../../lib/db";
import { revalidatePath } from "next/cache";
import {
  AttendingAs,
  SessionType,
  RegistrationType,
  CurrentStatus,
  PaymentStatus,
  TopicPreference,
  DietaryPreference,
  Gender,
  PaperStatus,
  Presenter
} from "@prisma/client"

// Registration CRUD
export async function getRegistrations(filters?: {
  attendingAs?: AttendingAs
  sessionType?: SessionType
  registrationType?: RegistrationType
}) {
  try {
    const registrations = await db.registration.findMany({
      where: filters,
      include: {
        presenterRegistration: {
          include: {
            presenters: true
          }
        },
        participantRegistration: true
      },
      orderBy: {
        id: 'desc'
      }
    })
    return { success: true, data: registrations }
  } catch (error: any) {
    console.error("Gagal mengambil data registrasi:", error)
    return { success: false, error: error.message }
  }
}

export async function getRegistrationById(id: number) {
  try {
    const registration = await db.registration.findUnique({
      where: { id },
      include: {
        presenterRegistration: {
          include: {
            presenters: true
          }
        },
        participantRegistration: true
      }
    })
    return { success: true, data: registration }
  } catch (error: any) {
    console.error("Gagal mengambil detail registrasi:", error)
    return { success: false, error: error.message }
  }
}

export async function updateRegistration(
  id: number,
  data: {
    attendingAs?: AttendingAs;
    sessionType?: SessionType;
    registrationType?: RegistrationType;
    proofOfPayment?: string;
  }
) {
  try {
    const registration = await db.registration.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard");
    return { success: true, data: registration };
  } catch (error: any) {
    console.error("Gagal memperbarui registrasi:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePaymentStatus(
  id: number,
  paymentStatus: PaymentStatus
) {
    try {
        const registration = await db.registration.update({
            where: { id },
            data: { paymentStatus },
        });
        revalidatePath("/dashboard");
        return { success: true, data: registration };
    } catch (error: any) {
        console.error("Gagal memperbarui status pembayaran:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteRegistration(id: number) {
  if (!id || typeof id !== 'number') {
    return { 
      success: false, 
      error: "ID registrasi tidak valid" 
    }
  }

  try {
    const registration = await db.registration.findUnique({
      where: { id },
      include: {
        presenterRegistration: {
          include: { // Add this include
            presenters: true
          }
        },
        participantRegistration: true
      }
    })

    if (!registration) {
      return {
        success: false,
        error: "Registrasi tidak ditemukan"
      }
    }

    await db.$transaction(async (tx) => {
      if (registration.presenterRegistration) {
        // Delete associated presenters FIRST
        if (registration.presenterRegistration.presenters) {
          for (const presenter of registration.presenterRegistration.presenters) {
            await tx.presenter.delete({
              where: { id: presenter.id }
            });
          }
        }

        await tx.presenterRegistration.delete({
          where: { id: registration.presenterRegistration.id }
        });
      }
      if (registration.participantRegistration) {
        await tx.participantRegistration.delete({
          where: { id: registration.participantRegistration.id }
        });
      }
      await tx.registration.delete({
        where: { id }
      });
    });

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("Gagal menghapus registrasi:", error)
    return { 
      success: false, 
      error: error.message || "Gagal menghapus registrasi"
    }
  }
}

export async function updatePaperFile(id: number, PaperSubmission: string) {
    try {
        const presenterReg = await db.presenterRegistration.update({
            where: { id },
            data: { PaperSubmission }
        });
        revalidatePath("/dashboard");
        return { success: true, data: presenterReg };
    } catch (error: any) {
        console.error("Failed to update Paper file:", error);
        return { success: false, error: error.message };
  }
}

export async function updatePaperStatus(id: number, paperStatus: PaperStatus) {
  try {
    const presenterReg = await db.presenterRegistration.update({
      where: { id },
      data: { paperStatus },
    });
    revalidatePath("/dashboard");
    return { success: true, data: presenterReg };
  } catch (error: any) {
    console.error("Failed to update paper status:", error);
    return { success: false, error: error.message };
  }
}

// Presenter Registration CRUD
export async function updatePresenterRegistration(id: number, data: {
  email?: string;
  currentStatus?: CurrentStatus;
  affiliation?: string
  topicPreference?: TopicPreference
  presentationTitle?: string
  PaperSubmission?: string
  dietaryPreference?: DietaryPreference
}) {
  try {
    const presenterReg = await db.presenterRegistration.update({
      where: { id },
      data
    })
    revalidatePath("/dashboard")
    return { success: true, data: presenterReg }
  } catch (error: any) {
    console.error("Gagal memperbarui registrasi presenter:", error)
    return { success: false, error: error.message }
  }
}

// Presenter CRUD
export async function updatePresenterComment(presenterId: number, comment: string) {
  try {
    const presenter = await db.presenter.update({
      where: { id: presenterId },
      data: { comment }
    });
    revalidatePath("/dashboard");
    return { success: true, data: presenter };
  } catch (error: any) {
    console.error("Gagal menyimpan komentar:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePresenter(id: number, data: {
  name?: string
  nationality?: string
  order?: number
  comment?: string
}) {
  try {
    const presenter = await db.presenter.update({
      where: { id },
      data
    })
    revalidatePath("/dashboard")
    return { success: true, data: presenter }
  } catch (error: any) {
    console.error("Gagal memperbarui presenter:", error)
    return { success: false, error: error.message }
  }
}

export async function deletePresenter(id: number) {
  try {
    await db.presenter.delete({
      where: { id }
    })
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("Gagal menghapus presenter:", error)
    return { success: false, error: error.message }
  }
}

// Participant Registration CRUD
export async function updateParticipantRegistration(id: number, data: {
  fullName?: string
  gender?: Gender
  nationality?: string
  cityState?: string
  email?: string
  currentStatus?: CurrentStatus
  affiliation?: string
  dietaryPreference?: DietaryPreference
}) {
  try {
    const participantReg = await db.participantRegistration.update({
      where: { id },
      data
    })
    revalidatePath("/dashboard")
    return { success: true, data: participantReg }
  } catch (error: any) {
    console.error("Gagal memperbarui registrasi peserta:", error)
    return { success: false, error: error.message }
  }
}

// Registration Fee CRUD
export async function getRegistrationFees() {
  try {
    const fees = await db.registrationFee.findMany({
      orderBy: {
        id: 'asc'
      }
    })
    return { success: true, data: fees }
  } catch (error: any) {
    console.error("Gagal mengambil data biaya registrasi:", error)
    return { success: false, error: error.message }
  }
}

export async function updateRegistrationFee(id: number, data: {
  earlyBirdFee?: number
  regularFee?: number
  isEarlyBird?: boolean
}) {
  try {
    const fee = await db.registrationFee.update({
      where: { id },
      data
    })
    revalidatePath("/dashboard")
    return { success: true, data: fee }
  } catch (error: any) {
    console.error("Gagal memperbarui biaya registrasi:", error)
    return { success: false, error: error.message }
  }
}

// User CRUD (for admin management)
export async function getUsers() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return { success: true, data: users }
  } catch (error: any) {
    console.error("Gagal mengambil data pengguna:", error)
    return { success: false, error: error.message }
  }
}

export async function updateUser(id: string, data: {
  email?: string
  name?: string
}) {
  try {
    const user = await db.user.update({
      where: { id },
      data
    })
    revalidatePath("/dashboard")
    return { success: true, data: user }
  } catch (error: any) {
    console.error("Gagal memperbarui pengguna:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: { id }
    })
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("Gagal menghapus pengguna:", error)
    return { success: false, error: error.message }
  }
}
