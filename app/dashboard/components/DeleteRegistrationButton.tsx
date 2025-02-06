"use client"

import React from "react";
import { Button } from "@/components/ui/button";

interface DeleteRegistrationButtonProps {
  registrationId: number;
}

export function DeleteRegistrationButton({ registrationId }: DeleteRegistrationButtonProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm("Apakah anda yakin untuk menghapus?")) {
      e.preventDefault();
    }
  };

  return (
    <form method="post" action="/api/registrations/delete" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={registrationId} />
      <Button variant="destructive" type="submit" size="sm">
        Hapus
      </Button>
    </form>
  );
}
