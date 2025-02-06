import { useEffect, useState } from "react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date("2025-08-01T00:00:00+09:00") // Korea timezone
    
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-4 gap-6 mt-12">
      <div className="text-center bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="text-4xl font-bold text-primary">{String(timeLeft.days).padStart(3, "0")}</div>
        <div className="text-sm font-medium text-muted-foreground mt-1">Days</div>
      </div>
      <div className="text-center bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="text-4xl font-bold text-primary">{String(timeLeft.hours).padStart(2, "0")}</div>
        <div className="text-sm font-medium text-muted-foreground mt-1">Hours</div>
      </div>
      <div className="text-center bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="text-4xl font-bold text-primary">{String(timeLeft.minutes).padStart(2, "0")}</div>
        <div className="text-sm font-medium text-muted-foreground mt-1">Minutes</div>
      </div>
      <div className="text-center bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="text-4xl font-bold text-primary">{String(timeLeft.seconds).padStart(2, "0")}</div>
        <div className="text-sm font-medium text-muted-foreground mt-1">Seconds</div>
      </div>
    </div>
  )
}
