import Link from "next/link";
import {
  Send,
  PiggyBank,
  FileText,
  Shield,
  Users,
  TrendingUp,
  Settings,
} from "lucide-react";
import FAQSection from "@/components/FAQSection";
import FeatureSection from "@/components/FeatureSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">RemitWise</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link href="/send" className="text-gray-700 hover:text-blue-600">
                Send Money
              </Link>
              <Link href="/goals" className="text-gray-700 hover:text-blue-600">
                Savings Goals
              </Link>
              <Link href="/bills" className="text-gray-700 hover:text-blue-600">
                Bills
              </Link>
              <Link
                href="/settings"
                className="text-gray-700 hover:text-blue-600"
              >
                Settings
              </Link>
            </nav>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Smart Remittance & Financial Planning
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help families save, plan, and protect — not just send money. Built
            on Stellar for fast, low-cost cross-border payments.
          </p>
        </div>

        {/* New Dark Feature Cards */}
        <FeatureSection />

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/send"
              className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition"
            >
              <div className="font-semibold text-lg mb-2">Send Remittance</div>
              <div className="text-blue-100 text-sm">
                Send money to family with smart allocation
              </div>
            </Link>
            <Link
              href="/split"
              className="bg-indigo-600 text-white p-6 rounded-lg hover:bg-indigo-700 transition"
            >
              <div className="font-semibold text-lg mb-2">Configure Split</div>
              <div className="text-indigo-100 text-sm">
                Set up automatic money allocation rules
              </div>
            </Link>
            <Link
              href="/dashboard"
              className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition"
            >
              <div className="font-semibold text-lg mb-2">View Dashboard</div>
              <div className="text-purple-100 text-sm">
                See financial insights and transaction history
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
    >
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
