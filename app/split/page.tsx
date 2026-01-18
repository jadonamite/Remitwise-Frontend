import Link from 'next/link'
import { ArrowLeft, Save, Info } from 'lucide-react'

export default function SplitConfiguration() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Smart Money Split</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Configure Automatic Allocation</h2>
            <p className="text-gray-600">
              Set how remittances should be automatically split. Percentages must total 100%.
            </p>
          </div>

          {/* Split Configuration Form */}
          <form className="space-y-6">
            <SplitInput
              label="Daily Spending"
              description="For immediate family expenses"
              value={50}
              color="bg-blue-500"
            />
            <SplitInput
              label="Savings"
              description="Allocated to savings goals"
              value={30}
              color="bg-green-500"
            />
            <SplitInput
              label="Bills"
              description="Automated bill payments"
              value={15}
              color="bg-yellow-500"
            />
            <SplitInput
              label="Insurance"
              description="Micro-insurance premiums"
              value={5}
              color="bg-purple-500"
            />

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">100%</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">How It Works</h3>
                  <p className="text-sm text-blue-700">
                    When you send a remittance, the funds will be automatically allocated according to these percentages. 
                    For example, a $300 remittance will be split as: $150 spending, $90 savings, $45 bills, $15 insurance.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/"
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                disabled
              >
                <Save className="w-5 h-5" />
                <span>Save Configuration</span>
              </button>
            </div>
          </form>
        </div>

        {/* Integration Note */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Integration Required:</strong> Connect to remittance_split smart contract to initialize and update split configuration. 
            Validate that percentages sum to 100% before submitting.
          </p>
        </div>
      </main>
    </div>
  )
}

function SplitInput({ label, description, value, color }: { label: string, description: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className="text-2xl font-bold text-gray-900">{value}%</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div className={`${color} h-3 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        className="w-full"
        disabled
      />
    </div>
  )
}

