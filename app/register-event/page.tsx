import RegisterEventForm from "./register-event-form";
import Image from "next/image";


export default function RegisterEventPage() {
  return (
    <div className=" min-h-screen w-full py-4 md:py-8">
      <div className="mx-auto w-full max-w-[600px] space-y-6">
        <div className="flex flex-col items-center space-y-3 text-center">
          <Image
            src="/perpika.png"
            alt="Perpika Logo"
            width={180}
            height={40}
            className="mb-4 h-auto w-auto"
            priority
          />
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            ICONIK 2025 Registration
          </h1>
          <p className="text-base text-muted-foreground">
            International Conference by Indonesian Students in Korea
          </p>
          <div className="mt-2">
            <p className="text-base font-medium">1 August 2025 • Woosong University, Daejon</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Join us in exploring education, technology, entrepreneurship, social justice, and sustainable development towards Indonesia Emas 2045.</p>
          </div>
        </div>
        <RegisterEventForm />
      </div>
    </div>
  )
}
