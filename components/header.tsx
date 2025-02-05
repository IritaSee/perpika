import Image from "next/image"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Image
          src="/perpika.png"
          alt="Perpika Logo"
          width={120}
          height={40}
          className="object-contain"
          priority
        />
      </div>
    </header>
  )
}
