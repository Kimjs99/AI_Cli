export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold">🇰🇷 NOMAD KOREA</span>
            </div>
            <p className="text-gray-400 text-sm">
              대한민국 디지털 노마드를 위한 최고의 도시 찾기 플랫폼
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">탐색</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">🏠 홈</a></li>
              <li><a href="#" className="hover:text-white transition-colors">🗺️ 도시 목록</a></li>
              <li><a href="#" className="hover:text-white transition-colors">📊 랭킹</a></li>
              <li><a href="#" className="hover:text-white transition-colors">👥 커뮤니티</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">자료</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">📝 가이드</a></li>
              <li><a href="#" className="hover:text-white transition-colors">💡 팁</a></li>
              <li><a href="#" className="hover:text-white transition-colors">🔍 검색 도움말</a></li>
              <li><a href="#" className="hover:text-white transition-colors">📞 고객 지원</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">법적 고지</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-white transition-colors">쿠키 정책</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 NOMAD KOREA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}