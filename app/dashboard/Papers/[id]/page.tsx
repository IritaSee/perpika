import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function PaperPage({ params }: PageProps) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const presenterRegistration = await db.presenterRegistration.findUnique({
    where: { id },
  });

  if (!presenterRegistration || !presenterRegistration.PaperSubmission) {
    notFound();
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <embed
        src={presenterRegistration.PaperSubmission}
        type="application/pdf"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
