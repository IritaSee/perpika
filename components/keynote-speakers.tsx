import { Card } from "@/components/ui/card"
import { Mic, User2 } from "lucide-react"
import { motion } from "framer-motion"
import { ReactNode } from "react"
import Image from "next/image"

const AnimatedCard = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow">
        {children}
      </Card>
    </motion.div>
  )
}

const keynoteSpeakersData = [
  {
    name: "Ministry of Youth and Sport of Indonesia",
    title: "(confirmed)",
    theme: "Unleashing Youth Potential: Innovation and Creativity for Global Leadership",
    image: "/kemenpora.png", // Placeholder
    day: "Day 1"
  },
  {
    name: "Teuku Faris Riandi",
    title: "Commercial Manager Perta Arun Gas, Pertamina Subholding Gas Group",
    theme: " Indonesia's Significant Role in Today's Energy Transition",
    image: "/pertamina.png", // Placeholder
    day: "Day 1"
  },
  {
    name: "Amaliah Fitriah, Ph.D",
    title: "Educational & Cultural Attache of Indonesia for ROK, Indonesia Embassy in ROK",
    theme: "Role of Students in Strengthening Academic Diplomatic through Science and Culture Exchange",
    image: "/kbri.png", // Placeholder
    day: "Day 1"
  },
  {
    name: "Adam Lukman Chaubah",
    title: "Koordinator PPIDK Asia Oceania 2024-2025",
    theme: "Students as Agent for Reaching Indonesia Emas 2045",
    image: "/adam_lukman.jpg", // Placeholder
    day: "Day 1"
  }
]

const KeynoteSpeakers = () => {
  return (
    <section id="keynote" className="py-8 sm:py-12 md:py-20 px-2 sm:px-4 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
          <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full">
            <Mic className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Speakers</h2>
        </div>
        <div className="space-y-6 sm:space-y-8">
          <div>
            {/* <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Day 1</h3> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
              {keynoteSpeakersData
                .filter((speaker) => speaker.day === "Day 1")
                .map((speaker) => (
                <AnimatedCard key={speaker.name}>
              <div className="flex flex-col h-[350px] sm:h-[400px]">
                <div className="aspect-square relative bg-muted rounded-md sm:rounded-lg overflow-hidden flex items-center justify-center">
                      <Image
                        src={speaker.image}
                        alt={`Foto ${speaker.name}`}
                        layout="fill"
                        objectFit="cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                        }}
                      />
                      <div className="fallback-icon hidden">
                        <User2 className="h-20 w-20 text-muted-foreground/50" />
                      </div>
                    </div>
                <div className="mt-2 flex flex-col h-[140px] sm:h-[180px]">
                  <h3 className="text-sm sm:text-base font-semibold line-clamp-2">{speaker.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{speaker.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1 line-clamp-3">
                        {speaker.theme}
                      </p>
                      {/* <p className="text-xs text-muted-foreground mt-auto">
                        {speaker.day}
                      </p> */}
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </section>
  )
}

export default KeynoteSpeakers
