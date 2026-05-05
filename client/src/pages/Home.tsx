import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ScreeningDashboard } from "@/components/ScreeningDashboard";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI-Powered Resume Screening
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto">
              Automatically extract skills, match candidates against job requirements, and rank resumes with intelligent scoring.
              Save hours on recruitment with our advanced ML-powered screening system.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-semibold text-white mb-2">LLM-Powered Extraction</h3>
              <p className="text-slate-400 text-sm">
                Intelligent extraction of skills, experience, and education from resumes
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-white mb-2">Advanced Scoring</h3>
              <p className="text-slate-400 text-sm">
                TF-IDF and semantic similarity combined for accurate candidate matching
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Rankings</h3>
              <p className="text-slate-400 text-sm">
                Get ranked candidate lists with detailed score breakdowns and gap analysis
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold rounded-lg"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Resume Screening</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user?.name || user?.email}</span>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <ScreeningDashboard />
    </div>
  );
}
