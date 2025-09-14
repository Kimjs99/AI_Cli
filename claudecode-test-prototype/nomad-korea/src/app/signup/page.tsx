import SignupForm from './signup-form'

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            NOMAD KOREA에서 최고의 디지털 노마드 도시를 찾아보세요
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}