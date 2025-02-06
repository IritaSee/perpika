"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { Info, MapPin, Target, Users, Calendar, BookOpen, CreditCard, Mic } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
        <div className="space-y-8">
          <Image
            src="/perpika.png"
            alt="ICONIK 2025"
            width={200}
            height={100}
            className="mx-auto rounded-lg"
          />
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              International Conference by Indonesian Students in Korea (ICONIK) 2025
            </h1>
            <div className="flex items-center gap-2 justify-center text-xl md:text-2xl mb-8 text-muted-foreground/80">
              <Calendar className="h-5 w-5" />
              <p>1 August 2025 - Daejon, South Korea</p>
            </div>
          </div>
          <div className="space-y-4">
            <Link href="/timeline">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
                VIEW SCHEDULE
              </Button>
            </Link>
          </div>
          <CountdownTimer />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 bg-white scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="p-2 bg-primary/10 rounded-full">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-semibold">About Us</h2>
          </div>
          <Card className="p-6 md:p-8 shadow-md">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Indonesia is on an inspiring journey toward <strong className="text-foreground">Indonesia Emas 2045</strong>, a vision that marks 100 years of independence with aspirations for prosperity, innovation, and global prominence. At the heart of this transformation are students—dynamic, creative, and full of potential—who play a crucial role in shaping the nation's future.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ICONIK as an international conference brings together scholars, educators, policymakers, and students from around the world to highlight the vital contributions of young minds. From education and technology to entrepreneurship, social justice, and sustainable development, students are driving progress and tackling challenges with fresh perspectives and innovative ideas.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By fostering collaboration and sharing best practices, we aim to inspire the next generation of leaders who are equipped not just with skills and knowledge, but also with a deep sense of responsibility and passion for building a better Indonesia. Together, we celebrate students as the architects of a brighter, more prosperous future for all.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="p-2 bg-primary/10 rounded-full">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-semibold">Objectives</h2>
          </div>
          <div className="grid gap-6">
            <Card className="p-6 md:p-8 shadow-md">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">1. To Highlight the Role of Students in National Development</h3>
                <p className="text-muted-foreground">
                  Explore how students can actively contribute to Indonesia's transformation in various sectors such as education, technology, entrepreneurship, social justice, and sustainable development.
                </p>
              </div>
            </Card>
            <Card className="p-6 md:p-8 shadow-md">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">2. To Inspire and Empower Future Leaders</h3>
                <p className="text-muted-foreground">
                  Motivate students to take on leadership roles and equip them with the necessary skills and knowledge to drive national progress.
                </p>
              </div>
            </Card>
            <Card className="p-6 md:p-8 shadow-md">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">3. To Foster Collaboration and Networking</h3>
                <p className="text-muted-foreground">
                  Create a platform for students, educators, policymakers, and industry leaders to exchange ideas, share best practices, and build networks that support national development.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Venue and Accommodation Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="p-2 bg-primary/10 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-semibold">Venue and Accommodation</h2>
          </div>
          <Card className="p-6 md:p-8 shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-2">Venue</h3>
            <p className="text-muted-foreground">Woosong University, Daejon</p>
          </Card>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center">Recommended Accommodations</h3>
            <div className="grid gap-6">
              <Card className="p-6 md:p-8 shadow-md">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">1. Residence Hotel Line ⭐️⭐️⭐️</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Price: ± 700.000 – 800.000/night</li>
                    <li>Est 36-40 Mins by Bus (102) to Woosung University</li>
                  </ul>
                </div>
              </Card>
              <Card className="p-6 md:p-8 shadow-md">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">2. Benikea Hotel Daelim ⭐️⭐️⭐️</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Price: ± 550.000 – 650.000/night</li>
                    <li>Est 26-30 Mins by Bus (311) to Woosung University</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="py-20 px-4 bg-white scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="p-2 bg-primary/10 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-semibold">Conference Topics</h2>
          </div>
          <div className="grid gap-6">
            <Card className="p-6 md:p-8 shadow-md">
              <div className="space-y-6">
                <p className="text-muted-foreground text-center">
                  ICONIK 2025 publishes various topics from life sciences, engineering, business and social science. Those topic detailed as:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-3 text-muted-foreground list-disc pl-4">
                      <li>Engineering</li>
                      <li>Health Science</li>
                      <li>Life Science</li>
                      <li>Earth Science</li>
                      <li>Material Science</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-3 text-muted-foreground list-disc pl-4">
                      <li>Social, Law, and Political Science</li>
                      <li>Humanities</li>
                      <li>Sports and Arts</li>
                      <li>Business and Public Administration</li>
                      <li>Education</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Fee Section */}
      <section id="registration" className="py-20 px-4 bg-gray-50 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="p-2 bg-primary/10 rounded-full">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-semibold">Registration Fee</h2>
          </div>
          <Card className="p-6 md:p-8 shadow-md">
            <div className="space-y-6">
              <p className="text-center text-muted-foreground">
                ICONIK 2025 supports both online and offline attendance. Registration fee for both type of attendances are explained below.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 px-4 text-left font-semibold">Registration Type</th>
                      <th className="py-4 px-4 text-left font-semibold">Early Bird Registration Fee</th>
                      <th className="py-4 px-4 text-left font-semibold">Registration Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-4 px-4">Online Participant (35 Participants Only)</td>
                      <td className="py-4 px-4">-</td>
                      <td className="py-4 px-4">Free</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4" rowSpan={2}>Online Participant</td>
                      <td className="py-4 px-4">-</td>
                      <td className="py-4 px-4">KRW 40,000<br/>(One Day Only)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">-</td>
                      <td className="py-4 px-4">KRW 50,000<br/>(Two Days)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4" rowSpan={2}>Offline Participant</td>
                      <td className="py-4 px-4">-</td>
                      <td className="py-4 px-4">KRW 75,000<br/>(One Day Only)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">-</td>
                      <td className="py-4 px-4">KRW 100,000<br/>(Two Days)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">Offline Indonesia Students Presenter</td>
                      <td className="py-4 px-4">KRW 100,000</td>
                      <td className="py-4 px-4">KRW 150,000</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">Online Indonesia Students Presenter</td>
                      <td className="py-4 px-4">KRW 75,000</td>
                      <td className="py-4 px-4">KRW 100,000</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">Offline Foreigners Presenter</td>
                      <td className="py-4 px-4">KRW 200,000</td>
                      <td className="py-4 px-4">KRW 275,000</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">Online Foreigners Presenter</td>
                      <td className="py-4 px-4">KRW 175,000</td>
                      <td className="py-4 px-4">KRW 250,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Keynote Speaker Section */}
      <section id="keynote" className="py-20 px-4 bg-white scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="p-2 bg-primary/10 rounded-full">
              <Mic className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-semibold">Keynote Speakers</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 md:p-8 shadow-md">
              <div className="space-y-4">
                <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Photo Coming Soon
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Prof. Dr. Rorez</h3>
                  <p className="text-muted-foreground">Seoul National University</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Expert in IT enginering and Software Development
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 md:p-8 shadow-md">
              <div className="space-y-4">
                <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Photo Coming Soon
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Dr. Bambang</h3>
                  <p className="text-muted-foreground">Korea Advanced Institute of Science and Technology</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Leading Researcher in Technology Innovation
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Committee Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-semibold">Committee</h2>
          </div>
          <Card className="p-6 md:p-8 shadow-md">
            <ul className="space-y-4">
              <li className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Director:</span>
                <span className="text-muted-foreground">Billy Castyana (Sungkyunkwan University), Vice Minister of Social, Culture, and Development PERPIKA</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Vice Director:</span>
                <span className="text-muted-foreground">Astari Puspita Sari (Andong National University), Minister of Social, Culture, and Development PERPIKA</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Secretary:</span>
                <span className="text-muted-foreground">Fathani Rakhmah (Daegu Catholic University)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Treasurer:</span>
                <span className="text-muted-foreground">Tiara Dewi Aghnia (Chung Ang University)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Academic:</span>
                <span className="text-muted-foreground">Afdhal Kurniawan (Kookmin University)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[120px]">HPDD:</span>
                <span className="text-muted-foreground">Kezia Rey Siahaan (Woosong University) & Livia Madina (Hoseo University)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Programme lead:</span>
                <span className="text-muted-foreground">Destinalutfi Citra Rahmadani (Kongju National University)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Logistic:</span>
                <span className="text-muted-foreground">Vincent Suvandi (Kyung Hee University)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Sponsorship:</span>
                <span className="text-muted-foreground">Wina Oktalia Cahyadi (Jeonbuk National University)</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </main>
  )
}
