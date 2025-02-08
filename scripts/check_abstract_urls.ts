import { getRegistrations } from "../app/dashboard/actions";
import { RegistrationWithRelations } from "../app/types";

async function checkAbstractUrls() {
  const { data: registrations, success } = await getRegistrations({ attendingAs: 'PRESENTER' });

  if (success && registrations) {
    registrations.forEach((registration: RegistrationWithRelations) => {
      if (registration.presenterRegistration) {
        console.log(
          `Registration ID: ${registration.id}, Presenter Registration ID: ${registration.presenterRegistration.id}, Abstract URL: ${registration.presenterRegistration.abstractSubmission}`
        );
      } else {
        console.log(`Registration ID: ${registration.id}, No Presenter Registration`);
      }
    });
  } else {
    console.error("Failed to fetch registrations.");
  }
}

checkAbstractUrls();
