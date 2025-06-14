"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { X } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { Info, MapPin, Target, Users, Calendar, BookOpen, CreditCard, Mic } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import KeynoteSpeakers from "@/components/keynote-speakers"
import InvitedSpeakers from "@/components/invited-speakers"
import Schedule from "@/components/schedule"
import { motion, useScroll, useSpring, useInView, useAnimation } from "framer-motion"
import { useRef, useEffect, ReactNode } from "react"

const Section = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}

const AnimatedCard = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
        {children}
      </Card>
    </motion.div>
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main className="min-h-screen relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <Section>
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-primary/10 via-background to-background overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/perpika.png"
                alt="ICONIK 2025 Background"
                layout="fill"
                objectFit="contain"
                className="scale-[0.7]"
              />
            </div>
           
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent"></div>
          </div>
          
          <div className="container relative z-10 max-w-7xl mx-auto px-4">
            <div className="space-y-8 sm:space-y-12">
              {/* Main Title */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 leading-tight">
                  International Conference by Indonesian Students in Korea (ICONIK) 2025
                </h1>
                
                <div className="flex items-center gap-2 justify-center text-lg sm:text-xl md:text-2xl text-muted-foreground">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <p>31 July 2025 - Chuncheon, South Korea</p>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
                <Sheet>
                  <SheetTrigger asChild>
                    <div className="w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto border-2 border-primary/80 hover:bg-primary/20 text-primary shadow-lg text-base font-semibold px-8 py-6 rounded-md"
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </SheetTrigger>

                  <Link href="/register-event" className="w-full sm:w-auto">
                    <div className="w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto bg-primary shadow-xl text-white font-semibold px-8 py-6 rounded-md"
                      >
                        <Users className="w-5 h-5 mr-2" />
                        REGISTER NOW
                      </Button>
                    </div>
                  </Link>
                  
                  <Link href="https://docs.google.com/document/d/12he2inpCHiFIWEG_CuOo4izqokGKMSuWobf7H33YvT0/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <div className="w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto border-2 border-primary/80 hover:bg-primary/20 text-primary shadow-lg text-base font-semibold px-8 py-6 rounded-md"
                      >
                        <Users className="w-5 h-5 mr-2" />
                        Guideline
                      </Button>
                    </div>
                  </Link>

                  {/* schedule */}
                  <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
                    <div className="h-full flex flex-col">
                      <div className="p-4 sm:p-5 border-b">
                        <SheetHeader>
                          <SheetTitle className="text-lg sm:text-xl font-bold">Important Dates</SheetTitle>
                        </SheetHeader>
                      </div>
                      <div className="flex-1 h-[calc(100vh-4rem)]">
                        <Schedule />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Countdown Timer with enhanced styling */}
              <div>
                <CountdownTimer />
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* About Us Section */}
      <Section>
        <section id="about" className="py-8 sm:py-12 md:py-20 px-2 sm:px-4 bg-white scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full">
                <Info className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">About Us</h2>
            </div>
            <AnimatedCard>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Indonesia is on an inspiring journey toward <strong className="text-foreground">Indonesia Emas 2045</strong>, a vision that marks 100 years of independence with aspirations for prosperity, innovation, and global prominence. At the heart of this transformation are students—dynamic, creative, and full of potential—who play a crucial role in shaping the nation's future.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  ICONIK as an international conference brings together scholars, educators, policymakers, and students from around the world to highlight the vital contributions of young minds. From education and technology to entrepreneurship, social justice, and sustainable development, students are driving progress and tackling challenges with fresh perspectives and innovative ideas.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  By fostering collaboration and sharing best practices, we aim to inspire the next generation of leaders who are equipped not just with skills and knowledge, but also with a deep sense of responsibility and passion for building a better Indonesia. Together, we celebrate students as the architects of a brighter, more prosperous future for all.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </section>
      </Section>

      {/* Objectives Section */}
      <Section>
        <section className="py-8 sm:py-12 md:py-20 px-2 sm:px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Objectives</h2>
            </div>
            <div className="grid gap-4 sm:gap-6">
              <AnimatedCard>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold">1. To Highlight the Role of Students in National Development</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Explore how students can actively contribute to Indonesia's transformation in various sectors such as education, technology, entrepreneurship, social justice, and sustainable development.
                  </p>
                </div>
              </AnimatedCard>
              <AnimatedCard>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold">2. To Inspire and Empower Future Leaders</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Motivate students to take on leadership roles and equip them with the necessary skills and knowledge to drive national progress.
                  </p>
                </div>
              </AnimatedCard>
              <AnimatedCard>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold">3. To Foster Collaboration and Networking</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Create a platform for students, educators, policymakers, and industry leaders to exchange ideas, share best practices, and build networks that support national development.
                  </p>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>
      </Section>

      {/* Venue and Accommodation Section */}
      <Section>
        <section className="py-8 sm:py-12 md:py-20 px-2 sm:px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Offline Venue</h2>
            </div>
            <AnimatedCard>
              {/* <h3 className="text-base sm:text-lg font-semibold mb-2"> </h3> */}
              <p className="text-sm sm:text-base text-muted-foreground">Kangwon National University, Chuncheon Campus</p>
              {/* add maps here soon */}

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.383413993882!2d127.7344213152585!3d37.87834307974599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6e0c2e0e1d1f%3A0x7b3f7c0d8c7e3d2d!2sKangwon%20National%20University!5e0!3m2!1sen!2skr!4v1634315172790!5m2!1sen!2skr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </AnimatedCard>
            <AnimatedCard>
              <div className="space-y-4">
                <div>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Traveling from Seoul or Incheon International Airport to Kangwon National University's Chuncheon Campus is convenient, with several public transportation options available.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold mb-2">From Incheon International Airport:</h4>
                    <ol className="list-decimal pl-5 space-y-3 text-sm sm:text-base text-muted-foreground">
                      <li>
                        <strong>Airport Railroad Express (AREX) to Seoul:</strong>
                        <p>Begin by taking the AREX from Incheon International Airport to either Seoul Station or Cheongnyangni Station. The AREX provides both express and all-stop services, with the express reaching Seoul Station in about 43 minutes.</p>
                      </li>
                      <li>
                        <strong>Transfer to ITX-Cheongchun:</strong>
                        <p>At Seoul Station, transfer to the ITX-Cheongchun train bound for Chuncheon. Alternatively, if you arrived at Cheongnyangni Station via AREX, you can board the ITX-Cheongchun there. The ITX-Cheongchun offers a comfortable and faster journey compared to regular subway lines, reaching Chuncheon in approximately 68 minutes from Seoul Station.</p>
                      </li>
                      <li>
                        <strong>Arrival at Namchuncheon Station:</strong>
                        <p>For closer proximity to Kangwon National University, disembark at Namchuncheon Station. This station is often referred to as 'Kangwon Nat'l Univ. station' due to its vicinity to the university.</p>
                      </li>
                      <li>
                        <strong>Local Transit to the University:</strong>
                        <p>From Namchuncheon Station, the university campus is accessible by a short taxi ride or local bus services.</p>
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-semibold mb-2">From Seoul:</h4>
                    <ol className="list-decimal pl-5 space-y-3 text-sm sm:text-base text-muted-foreground">
                      <li>
                        <strong>ITX-Cheongchun from Yongsan or Cheongnyangni Stations:</strong>
                        <p>Board the ITX-Cheongchun train at either Yongsan or Cheongnyangni Station. This service provides a swift connection to Chuncheon, with the journey to Namchuncheon Station taking approximately 52 minutes from Cheongnyangni.</p>
                      </li>
                      <li>
                        <strong>Alternative via Gyeongchun Line Subway:</strong>
                        <p>Alternatively, you can take the Gyeongchun Line subway from Sangbong Station in Seoul directly to Namchuncheon Station. This option is integrated into the Seoul Metropolitan Subway system, offering a more economical, albeit longer, journey compared to the ITX-Cheongchun.</p>
                      </li>
                      <li>
                        <strong>Proceed to the University:</strong>
                        <p>Upon arrival at Namchuncheon Station, local transportation options such as buses or taxis are available to reach the university campus.</p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </AnimatedCard>
            
            {/* <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-semibold text-center">Recommended Accommodations</h3>
              <div className="grid gap-4 sm:gap-6">
                <AnimatedCard>
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg font-semibold">1. Residence Hotel Line ⭐️⭐️⭐️</h4>
                    <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                      <li>Price: ± 700.000 – 800.000/night</li>
                      <li>Est 36-40 Mins by Bus (102) to Woosung University</li>
                    </ul>
                  </div>
                </AnimatedCard>
                <AnimatedCard>
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg font-semibold">2. Benikea Hotel Daelim ⭐️⭐️⭐️</h4>
                    <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                      <li>Price: ± 550.000 – 650.000/night</li>
                      <li>Est 26-30 Mins by Bus (311) to Woosung University</li>
                    </ul>
                  </div>
                </AnimatedCard>
              </div>
            </div> */}


          </div>
        </section>
      </Section>

      {/* Topics Section */}
      <Section>
        <section id="topics" className="py-8 sm:py-12 md:py-20 px-2 sm:px-4 bg-white scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Conference Topics</h2>
            </div>
            <AnimatedCard>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base text-muted-foreground text-center">
                  ICONIK 2025 publishes various topics from life sciences, engineering, business and social science. Those topic detailed as:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground list-disc pl-4">
                      <li>⚡ Engineering</li>
                      <li>🏥 Health Science</li>
                      <li>🧬 Life Science</li>
                      <li>🌍 Earth Science</li>
                      <li>🔬 Material Science</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground list-disc pl-4">
                      <li>⚖️ Social, Law, and Political Science</li>
                      <li>📚 Humanities</li>
                      <li>🎨 Sports and Arts</li>
                      <li>💼 Business and Public Administration</li>
                      <li>🎓 Education</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </section>
      </Section>

      {/* Registration Fee Section */}
      <Section>
        <section id="registration" className="py-8 sm:py-12 md:py-20 px-2 sm:px-4 bg-gray-50 scroll-mt-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Registration Fee</h2>
            </div>
            <AnimatedCard>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base text-center text-muted-foreground">
                  ICONIK 2025 supports both online and offline attendance. Registration fee for both type of attendances are explained below.
                </p>
                <div className="overflow-x-auto -mx-4 sm:-mx-6">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 sm:py-4 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold">Registration Type</th>
                            <th className="py-3 sm:py-4 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold">Registration Fee</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm">Indonesian Presenter</td>
                            <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium">KRW 100,000</td>
                          </tr>
                          <tr>
                            <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm">Others Nationality Presenter</td>
                            <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium">KRW 200,000</td>
                          </tr>
                          <tr>
                            <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm">Participant</td>
                            <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium">KRW 50,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </section>
      </Section>

      {/* Keynote Speaker Section */}
      <KeynoteSpeakers />

      {/* Invited Speaker Section */}
      <InvitedSpeakers />

      {/* Committee Section */}
      <Section>
        <section className="py-8 sm:py-12 md:py-20 px-2 sm:px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Committee</h2>
            </div>
            <AnimatedCard>
              <ul className="space-y-4">
                <li className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base sm:min-w-[120px]">Director:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Billy Castyana (Sungkyunkwan University), Vice Minister of Social, Culture, and Development PERPIKA</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base sm:min-w-[120px]">Vice Director:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Astari Puspita Sari (Andong National University), Minister of Social, Culture, and Development PERPIKA</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base sm:min-w-[120px]">Secretary:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Fathani Rakhmah (Daegu Catholic University)</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base sm:min-w-[120px]">Treasurer:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Tiara Dewi Aghnia (Chung Ang University)</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base sm:min-w-[120px]">Academic:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Afdhal Kurniawan (Kookmin University)</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base sm:min-w-[120px]">HPDD:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Kezia Rey Siahaan (Woosong University) & Livia Madina (Hoseo University)</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base sm:min-w-[120px]">Programme lead:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Destinalutfi Citra Rahmadani (Kongju National University)</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base sm:min-w-[120px]">Logistic:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Vincent Suvandi (Kyung Hee University)</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base sm:min-w-[120px]">Sponsorship:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">Wina Oktalia Cahyadi (Jeonbuk National University)</span>
                </li>
              </ul>
            </AnimatedCard>
          </div>
        </section>
      </Section>
    </main>
  )
}
