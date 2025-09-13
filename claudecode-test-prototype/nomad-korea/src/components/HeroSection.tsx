import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  const quickSearchTags = ["#판교", "#홍대", "#부산", "#제주", "#춘천", "#전주"]
  
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-blue-200 mb-8">
          <span className="text-2xl mr-2">🇰🇷</span>
          <span className="text-blue-600 font-semibold">NOMAD KOREA</span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          대한민국 디지털 노마드를 위한 
          <br />
          <span className="text-blue-600">최고의 도시 찾기</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          🏙️ 당신에게 완벽한 한국의 디지털 노마드 도시를 찾아보세요 🏙️
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 px-4">
          <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-lg shadow-lg border">
            <div className="flex-1 p-4">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <Input 
                  type="text"
                  placeholder="🔍 어떤 도시를 찾고 계신가요?"
                  className="border-0 text-base sm:text-lg placeholder-gray-500 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
            <Button className="m-2 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold bg-blue-600 hover:bg-blue-700">
              검색하기 🚀
            </Button>
          </div>
        </div>
        
        {/* Quick Search Tags */}
        <div className="mb-8">
          <p className="text-gray-600 mb-4">⚡ 빠른 검색:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {quickSearchTags.map((tag, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium bg-white hover:bg-blue-50 border border-blue-200 cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}