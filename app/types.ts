import {
  Registration,
  PresenterRegistration,
  ParticipantRegistration,
  Presenter,
  PaperStatus
} from "@prisma/client";

export type RegistrationWithRelations = Registration & {
  presenterRegistration: (PresenterRegistration & {
    presenters: Presenter[];
  }) | null;
  participantRegistration: ParticipantRegistration | null;
};
