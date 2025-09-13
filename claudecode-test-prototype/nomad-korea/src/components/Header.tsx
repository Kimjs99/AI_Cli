import { Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">🇰🇷 NOMAD KOREA</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              🏠 Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              🗺️ Cities
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              📊 Rankings
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              👥 Community
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              📝 Reviews
            </a>
          </nav>
          
          {/* Search and Login */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="검색..." 
                  className="pl-10 pr-4 py-2 w-48"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}