import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import FilterSection from "@/components/FilterSection"
import RankingSection from "@/components/RankingSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <FilterSection />
        <RankingSection />
      </main>
      <Footer />
    </div>
  )
}