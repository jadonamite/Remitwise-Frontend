import Link from 'next/link'
import { ArrowLeft, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function Bills() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Bill Payments</h1>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              disabled
            >
              <Plus className="w-5 h-5" />
              <span>Add Bill</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Unpaid Bills */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Unpaid Bills</h2>
          <div className="space-y-4">
            <BillCard
              name="Electricity"
              amount={50}
              dueDate="2024-01-20"
              recurring={true}
              status="pending"
            />
            <BillCard
              name="School Fees"
              amount={100}
              dueDate="2024-01-25"
              recurring={false}
              status="pending"
            />
            <BillCard
              name="Rent"
              amount={200}
              dueDate="2024-02-01"
              recurring={true}
              status="pending"
            />
          </div>
        </div>

        {/* Paid Bills */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Payments</h2>
          <div className="space-y-4">
            <BillCard
              name="Electricity"
              amount={50}
              dueDate="2023-12-20"
              recurring={true}
              status="paid"
            />
            <BillCard
              name="Internet"
              amount={30}
              dueDate="2023-12-15"
              recurring={true}
              status="paid"
            />
          </div>
        </div>

        {/* Add Bill Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Bill</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Name
              </label>
              <input
                type="text"
                placeholder="e.g., Electricity, School Fees, Rent"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="50.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="recurring"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled
              />
              <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                Recurring bill (e.g., monthly)
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled
            >
              Add Bill
            </button>
          </form>
        </div>

        {/* Integration Note */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Integration Required:</strong> Connect to bill_payments smart contract to create bills, 
            mark as paid, and handle recurring bill generation. Integrate with payment processing for automated payments.
          </p>
        </div>
      </main>
    </div>
  )
}

function BillCard({ name, amount, dueDate, recurring, status }: { name: string, amount: number, dueDate: string, recurring: boolean, status: 'pending' | 'paid' }) {
  const isOverdue = status === 'pending' && new Date(dueDate) < new Date()

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            {recurring && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Recurring</span>
            )}
            {isOverdue && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>Overdue</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Due: {dueDate}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 mb-2">${amount}</div>
          {status === 'paid' ? (
            <div className="flex items-center space-x-1 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Paid</span>
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
              disabled
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

