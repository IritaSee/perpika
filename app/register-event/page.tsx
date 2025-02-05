import RegisterEventForm from "./register-event-form";


export default function RegisterEventPage() {
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Daftar Event
          </h1>
          <p className="text-sm text-muted-foreground">
            Isi formulir di bawah untuk mendaftarkan event baru
          </p>
        </div>
        <RegisterEventForm />
      </div>
    </div>
  )
}
