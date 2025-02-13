-- CreateEnum
CREATE TYPE "AttendingAs" AS ENUM ('PRESENTER', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "CurrentStatus" AS ENUM ('BACHELOR_STUDENT', 'MASTER_STUDENT', 'PHD_STUDENT', 'RESEARCHER_PROFESSIONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "TopicPreference" AS ENUM ('ENGINEERING', 'HEALTH_SCIENCE', 'LIFE_SCIENCE', 'EARTH_SCIENCE', 'MATERIAL_SCIENCE', 'SOCIAL_LAW_POLITICAL_SCIENCE', 'HUMANITIES', 'SPORTS_AND_ARTS', 'BUSINESS_PUBLIC_ADMINISTRATION', 'EDUCATION');

-- CreateEnum
CREATE TYPE "DietaryPreference" AS ENUM ('VEGAN', 'HALAL');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMALE', 'MALE');

-- CreateEnum
CREATE TYPE "RegistrationType" AS ENUM ('ONLINE_PARTICIPANT_ONE_DAY', 'ONLINE_PARTICIPANT_TWO_DAYS', 'OFFLINE_PARTICIPANT_ONE_DAY', 'OFFLINE_PARTICIPANT_TWO_DAYS', 'PRESENTER_INDONESIA_STUDENT_ONLINE', 'PRESENTER_INDONESIA_STUDENT_OFFLINE', 'PRESENTER_FOREIGNER_ONLINE', 'PRESENTER_FOREIGNER_OFFLINE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaperStatus" AS ENUM ('UNDER_REVIEW', 'ACCEPTED', 'REVISION_REQUESTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "early_bird_periods" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "early_bird_periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration_fees" (
    "id" SERIAL NOT NULL,
    "registrationType" "RegistrationType" NOT NULL,
    "regularFee" INTEGER NOT NULL,
    "earlyBirdFee" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registration_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "attendingAs" "AttendingAs" NOT NULL,
    "sessionType" "SessionType" NOT NULL,
    "registrationType" "RegistrationType" NOT NULL,
    "proofOfPayment" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "isEarlyBird" BOOLEAN NOT NULL DEFAULT false,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "periodId" INTEGER,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PresenterRegistration" (
    "id" SERIAL NOT NULL,
    "registrationId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "currentStatus" "CurrentStatus" NOT NULL,
    "affiliation" TEXT NOT NULL,
    "topicPreference" "TopicPreference" NOT NULL,
    "presentationTitle" TEXT NOT NULL,
    "PaperSubmission" TEXT NOT NULL,
    "dietaryPreference" "DietaryPreference",
    "paperStatus" "PaperStatus" NOT NULL DEFAULT 'UNDER_REVIEW',

    CONSTRAINT "PresenterRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presenter" (
    "id" SERIAL NOT NULL,
    "presenterRegistrationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Presenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantRegistration" (
    "id" SERIAL NOT NULL,
    "registrationId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "nationality" TEXT NOT NULL,
    "cityState" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "currentStatus" "CurrentStatus" NOT NULL,
    "affiliation" TEXT NOT NULL,
    "dietaryPreference" "DietaryPreference",

    CONSTRAINT "ParticipantRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PresenterRegistration_registrationId_key" ON "PresenterRegistration"("registrationId");

-- CreateIndex
CREATE INDEX "Presenter_presenterRegistrationId_idx" ON "Presenter"("presenterRegistrationId");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantRegistration_registrationId_key" ON "ParticipantRegistration"("registrationId");

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "early_bird_periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PresenterRegistration" ADD CONSTRAINT "PresenterRegistration_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presenter" ADD CONSTRAINT "Presenter_presenterRegistrationId_fkey" FOREIGN KEY ("presenterRegistrationId") REFERENCES "PresenterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantRegistration" ADD CONSTRAINT "ParticipantRegistration_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
