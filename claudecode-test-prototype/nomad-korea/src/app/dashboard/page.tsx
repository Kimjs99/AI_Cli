import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import LogoutButton from './logout-button'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                NOMAD KOREA 대시보드
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {data.user.email}님 환영합니다
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              디지털 노마드 대시보드
            </h2>
            <p className="text-gray-600 mb-6">
              한국의 최고 디지털 노마드 도시를 찾아보고 맞춤형 추천을 받아보세요.
            </p>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  도시 추천
                </h3>
                <p className="text-gray-600">
                  생활비, 인터넷 속도, 안전도를 기반으로 한 맞춤형 도시 추천
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  생활비 분석
                </h3>
                <p className="text-gray-600">
                  각 도시별 월 평균 생활비와 예산 계획
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  커뮤니티
                </h3>
                <p className="text-gray-600">
                  다른 디지털 노마드들과의 정보 공유 및 네트워킹
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  인터넷 속도
                </h3>
                <p className="text-gray-600">
                  각 도시별 와이파이 속도 및 코워킹 스페이스 정보
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  안전도 지수
                </h3>
                <p className="text-gray-600">
                  치안, 의료 시설, 재해 위험도 종합 분석
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  문화 생활
                </h3>
                <p className="text-gray-600">
                  카페, 맛집, 관광지 등 라이프스타일 정보
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                더 많은 기능이 곧 추가될 예정입니다. 기대해 주세요!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}