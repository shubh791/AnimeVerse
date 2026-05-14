import Navbar from '@/components/navbar/Navbar'
import Hero from '@/components/hero/Hero'
import FeaturedWorlds from '@/components/sections/FeaturedWorlds'
import NowStreaming from '@/components/sections/NowStreaming'
import TopRated from '@/components/sections/TopRated'
import JoinBand from '@/components/sections/JoinBand'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="relative">
        <Hero />
        <FeaturedWorlds />
        <NowStreaming />
        <TopRated />
        <JoinBand />
        <Footer />
      </main>
    </div>
  )
}
