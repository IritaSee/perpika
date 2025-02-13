import { getRegistrations } from "../app/dashboard/actions";
import { RegistrationWithRelations } from "../app/types";

async function checkPaperUrls() {
  const { data: registrations, success } = await getRegistrations({ attendingAs: 'PRESENTER' });

  if (success && registrations) {
    registrations.forEach((registration: RegistrationWithRelations) => {
      if (registration.presenterRegistration) {
        console.log(
          `Registration ID: ${registration.id}, Presenter Registration ID: ${registration.presenterRegistration.id}, Paper URL: ${registration.presenterRegistration.PaperSubmission}`
        );
      } else {
        console.log(`Registration ID: ${registration.id}, No Presenter Registration`);
      }
    });
  } else {
    console.error("Failed to fetch registrations.");
  }
}

checkPaperUrls();
