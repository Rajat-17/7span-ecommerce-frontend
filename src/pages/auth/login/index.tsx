import { Page, Card } from '../../../components/ui'
import LoginForm from '../../../sections/auth/login/LoginForm'

export default function LoginPage() {
  return (
    <Page title="Login">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2aa4dd] shadow-lg shadow-[#2aa4dd]/30 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account to continue</p>
        </div>

        <Card
          size="sm"
          radius="2xl"
          shadow
          border
          className="p-8 border-[#2aa4dd]/10 shadow-xl shadow-[#2aa4dd]/10"
        >
          <LoginForm />
        </Card>
      </div>
    </Page>
  )
}