import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FilterSection() {
  const filterCategories = [
    {
      title: "💰 예산은?",
      icon: "💰",
      options: [
        { label: "💵 ~100만원", value: "budget-100" },
        { label: "💸 ~200만원", value: "budget-200" },
        { label: "💰 ~300만원", value: "budget-300" },
        { label: "💎 300만원+", value: "budget-300plus" }
      ]
    },
    {
      title: "🌐 인터넷은?",
      icon: "🌐",
      options: [
        { label: "📡 빠른 속도", value: "internet-fast" },
        { label: "📶 안정성", value: "internet-stable" },
        { label: "📱 5G 커버", value: "internet-5g" },
        { label: "☕ 카페WiFi", value: "internet-cafe" }
      ]
    },
    {
      title: "🚇 교통은?",
      icon: "🚇",
      options: [
        { label: "🚇 지하철", value: "transport-subway" },
        { label: "🚌 버스", value: "transport-bus" },
        { label: "🚗 차량", value: "transport-car" },
        { label: "🚲 자전거", value: "transport-bike" }
      ]
    },
    {
      title: "🏠 주거는?",
      icon: "🏠",
      options: [
        { label: "🏢 오피스텔", value: "housing-officetel" },
        { label: "🏠 원룸", value: "housing-studio" },
        { label: "🏡 아파트", value: "housing-apartment" },
        { label: "🏨 호텔", value: "housing-hotel" }
      ]
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎯 빠른 필터 선택
          </h2>
          <p className="text-gray-600">
            원하는 조건을 선택해서 맞춤형 도시를 찾아보세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filterCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex}
                    className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {option.label}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}