import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Wifi, DollarSign } from "lucide-react"

export default function RankingSection() {
  const topCities = [
    {
      rank: 1,
      rankEmoji: "🥇",
      name: "판교",
      emoji: "🏙️",
      rating: 4.2,
      budget: "280만원",
      internetSpeed: "85Mbps",
      description: "테크 중심지, 최고의 인프라",
      features: ["높은 인터넷 속도", "IT 기업 밀집", "좋은 교통접근성"]
    },
    {
      rank: 2,
      rankEmoji: "🥈",
      name: "부산해운대",
      emoji: "🌊",
      rating: 3.9,
      budget: "180만원",
      internetSpeed: "78Mbps",
      description: "해변과 함께하는 노마드 라이프",
      features: ["바다 전망", "저렴한 생활비", "관광 인프라"]
    },
    {
      rank: 3,
      rankEmoji: "🥉",
      name: "홍대",
      emoji: "🎓",
      rating: 4.0,
      budget: "250만원",
      internetSpeed: "92Mbps",
      description: "창의적이고 활기찬 문화지구",
      features: ["풍부한 카페", "문화 생활", "젊은 에너지"]
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🏆 TOP 랭킹 도시
          </h2>
          <p className="text-gray-600">
            디지털 노마드들이 가장 선호하는 한국의 도시들
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topCities.map((city, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${
                city.rank === 1 ? 'ring-2 ring-yellow-400 shadow-lg' : ''
              }`}
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge 
                  variant={city.rank === 1 ? "default" : "secondary"}
                  className={`text-lg px-3 py-1 ${
                    city.rank === 1 ? 'bg-yellow-500 hover:bg-yellow-600' : ''
                  }`}
                >
                  {city.rankEmoji} {city.rank}위
                </Badge>
              </div>
              
              {/* City Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">{city.emoji}</span>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">{city.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-700">{city.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{city.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{city.budget}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{city.internetSpeed}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-2">
                  {city.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Button 
                  className="w-full mt-4" 
                  variant={city.rank === 1 ? "default" : "outline"}
                >
                  자세히 보기 →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* More Cities Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            더 많은 도시 보기 📍
          </Button>
        </div>
      </div>
    </section>
  )
}