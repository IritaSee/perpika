import {
  Registration,
  PresenterRegistration,
  ParticipantRegistration,
  Presenter,
} from "@prisma/client";

export type RegistrationWithRelations = Registration & {
  presenterRegistration: (PresenterRegistration & {
    presenters: Presenter[];
  }) | null;
  participantRegistration: ParticipantRegistration | null;
};
